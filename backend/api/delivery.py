from flask import request, url_for, jsonify, json, Blueprint, render_template, abort
import os
import requests
from api.app import db, mail
from werkzeug.security import check_password_hash
from api.models import *
from api.auth import create_auth_token
from flask_mail import Message


delivery = Blueprint('delivery', __name__)




@delivery.route('/delivery/<int:shipment_id>/route', methods=['GET'])
def delivery_route(shipment_id):
    delivery = Delivery.query.filter_by(id=shipment_id).first()
    if delivery:
        shipment_data = delivery.serialize()
        shipment = Shipment.query.get(shipment_data['id'])
        status_history = [entry.serialize() for entry in shipment.status_history.all()]
        shipment_data['pickup_time'] = '04:00 pm'


       
        return jsonify({
            'shipment': shipment.serialize(),
             'status_history':status_history,
            'delivery': shipment_data
        }), 200
    else:
        return jsonify({'message': 'No shipments available'}), 404




@delivery.route('/geocode', methods=['POST'])
def geocode():


    
    try:
        # Get the sender and receiver locations from the request
        sender_location = request.json['senderLocation']
        receiver_location = request.json['receiverLocation']

        # Make requests to Mapbox Geocoding API for sender and receiver locations
        sender_coordinates = get_coordinates(sender_location)
        receiver_coordinates = get_coordinates(receiver_location)

        if not verify_coordinates(sender_coordinates, sender_location) or not verify_coordinates(receiver_coordinates, receiver_location):
            # Retry geocoding if coordinates do not match provided locations
            sender_coordinates = get_coordinates(sender_location)
            receiver_coordinates = get_coordinates(receiver_location)


        return jsonify({
            'senderCoordinates': sender_coordinates,
            'receiverCoordinates': receiver_coordinates
        })

    except Exception as e:
        return jsonify({'error': str(e)}), 500

def get_coordinates(location):
    try:
        # Make a request to Mapbox Geocoding API
        mapbox_access_token = 'pk.eyJ1IjoibXVnZW4yNDciLCJhIjoiY2t6YXc1d3ZtMWp5cDJvczhtaHNzNng5ZiJ9.ChuFB5ls73656qlh1alvwA'
        mapbox_url = f'https://api.mapbox.com/geocoding/v5/mapbox.places/{location}.json?access_token={mapbox_access_token}'
        response = requests.get(mapbox_url)
        data = response.json()

        # Extract coordinates
        coordinates = data['features'][0]['center']
        return coordinates

    except Exception as e:
        return None  # Handle the case where coordinates cannot be obtained


def verify_coordinates(coordinates, expected_location):
    # Example implementation: Compare obtained coordinates with expected location
    # For simplicity, this example checks if coordinates match exactly with the provided location
    return coordinates is not None and coordinates == get_coordinates(expected_location)



@delivery.route('/register', methods=['POST'])
def register():
    data = request.get_json()
    if not data:
        return jsonify({'msg': 'Missing JSON'}), 400

  
    user = AccidentReport(**data)
    db.session.add(user)
   

    try:
        db.session.commit()
    except Exception as e:
        error_message = f"An error occurred: {str(e)}"
        print(error_message)
        return jsonify({'message': error_message}), 500


    return jsonify({'message': 'Accident Reported successfully'}), 200


@delivery.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    if not data:
        return jsonify({'msg': 'Missing JSON'}), 400

    email = data.get('email')
    password = data.get('password')

    if not email or not password:
        return jsonify({'error': 'Invalid credentials'}), 400

    user = User.query.filter_by(email=email).first()
    if not user:
        return jsonify({'error': 'Invalid email'}), 401

    if not user.verify_password(password):
        return jsonify({'error': 'Invalid password'}), 401

    token = create_auth_token(user.id)
    return jsonify({'message': 'Login successful', 'user': user.id, 'user_role': user.user_role, 'token': token}), 200


@delivery.route('/user/<int:id>', methods=['GET'])
def get_user(id):
    user = User.query.filter_by(id=id).first()
    if user:
        return jsonify(user.serialize()), 200
    else:
        return jsonify({'message': 'User not found'}), 404


@delivery.route('/user/drivers', methods=['GET'])
def get_drivers():
    reports = AccidentReport.query.all()
    



    # Serialize reports
    report_list = []
    for report in reports:
        location_parts = (report.sender_location or "").split(",")
        filtered_location = ",".join(location_parts[2:])  # Skips 'Kenya' and 'Nakuru'
        report_list.append({
            "id": report.id,
            "location_description": report.location_description,
            "latitude": report.latitude,
            "longitude": report.longitude,
            "date_time": report.date_time.isoformat() if report.date_time else None,
            "accident_type": report.accident_type,
            "severity": report.severity,
            "weather": filtered_location,

            "road_condition": report.road_condition,
            "description": report.description,
            "status": report.status,
            "created_at": report.created_at.isoformat() if report.created_at else None
        })

    return jsonify(report_list), 200


@delivery.route('/accept_delivery/<int:shipments_id>/<int:driver_id>', methods=['POST'])
def add_delivery(shipments_id, driver_id):
    driver = User.query.get(driver_id)
    shipment = Shipment.query.get(shipments_id)
    print(driver,shipment)

    if driver and shipment:
        data = {
            'driver_id': driver_id,
            'shipments_id': shipments_id
        }

        delivery = Delivery(**data)
        db.session.add(delivery)
        shipment.status = 'ASSIGNED'

        try:
            db.session.commit()
            shipment.delivery_id = delivery.id
            shipment.update_status('ASSIGNED')
            db.session.commit()



        except Exception as e:
            error_message = f"An error occurred: {str(e)}"
            print(error_message)
            return jsonify({'message': error_message}), 500

        return jsonify({'message': 'Delivery accepted successfully'}), 200
    else:
        return jsonify({'error': 'Invalid delivery or driver ID'}), 404


@delivery.route('/delivery/status', methods=['POST'])
def accept_delivery():
    data = request.get_json()
    driver_id = data.get('driverId')
    status = data.get('status')
    driver_coordinates = data.get('location')

    delivery = Delivery.query.filter_by(id=driver_id).first()
    if delivery:
        delivery.status = status
        delivery.driver_coordinates = driver_coordinates
        delivery.shipments.update_status(status)
        db.session.commit()

        transaction_data = {
            'delivery_id': delivery.id,
            'status': status,
            'driver_coordinates': driver_coordinates
        }
       

        return jsonify({'message': f'Delivery {status} successfully'}), 200
    else:
        return jsonify({'error': 'No active delivery found for the specified driver'}), 404


@delivery.route('/chat', methods=['POST'])
def add_chat():
    data = request.get_json()
    if not data:
        return jsonify({'msg': 'Missing JSON'}), 400

    chat = Chat(**data)
    db.session.add(chat)

    try:
        db.session.commit()
    except Exception as e:
        error_message = f"An error occurred: {str(e)}"
        print(error_message)
        return jsonify({'message': error_message}), 500

    return jsonify({'message': 'Chat added successfully'}), 200


@delivery.route('/chat/<int:id>/messages', methods=['GET'])
def get_chat_messages(id):
    chats = Chat.query.filter_by(deliverId=id).all()
    if chats:
        serialized_chats = [chat.serialize() for chat in chats]
        return jsonify(serialized_chats), 200
    else:
        return jsonify([]), 404


@delivery.route('/shipment', methods=['POST'])
def shipment():
    data = request.get_json()
    if not data:
        return jsonify({'msg': 'Missing JSON'}), 400

    try:
        allowed_keys = [
            'user_id', 'reciever_coordinates', 'details', 'parcel', 'sender_location', 
            'reciever_name', 'reciever_contact', 'reciever_email', 'quantity', 'weight', 
            'sender_coordinates', 'reciever_location'
        ]
        filtered_data = {key: data[key] for key in allowed_keys if key in data}

    
        new_location = Location(
            sender_location=filtered_data.get('sender_location'),
            sender_coordinates=filtered_data.get('sender_coordinates'),
            reciever_location=filtered_data.get('reciever_location'),
            reciever_coordinates=filtered_data.get('reciever_coordinates'),
        )
        db.session.add(new_location)
        db.session.commit()  


    
        shipment = Shipment(
            user_id=filtered_data['user_id'],
            details=filtered_data.get('details'),
            parcel=filtered_data.get('parcel'),
            reciever_name=filtered_data.get('reciever_name'),
            reciever_contact=filtered_data.get('reciever_contact'),
            reciever_email=filtered_data.get('reciever_email'),
            quantity=filtered_data.get('quantity'),
            weight=filtered_data.get('weight'),
            location_id=new_location.id,
            status="NEW",
    
        )
        db.session.add(shipment)
        db.session.commit()

        status_entry = StatusHistory(
            shipment_id=shipment.id,
            name='NEW'
        )
        db.session.add(status_entry)
        db.session.commit()

        # Step 3: Add the shipment transaction to the blockchain
    
        return jsonify({'msg': 'Shipment created successfully'}), 200

    except Exception as e:
        print(f'Error processing data: {e}')
        db.session.rollback()  # Rollback in case of failure
        return jsonify({'error': 'Internal Server Error'}), 500


@delivery.route('/shipments/<int:user_id>', methods=['GET'])
def get_shipments(user_id):
    try:
        shipments = Shipment.query.filter_by(user_id=user_id).all()
        if shipments:
            serialized_shipments = [shipment.serialize() for shipment in shipments]

            return jsonify(serialized_shipments), 200
        else:
            return jsonify({'message': 'No shipments available for the user'}), 404
    except Exception as e:
        print(f'Error retrieving shipments: {e}')
        return jsonify({'error': 'Internal Server Error'}), 500


@delivery.route('/shipment/<int:id>', methods=['GET'])
def get_single_listing(id):
    shipment = Shipment.query.filter_by(id=id).first()
    status_history = [entry.serialize() for entry in shipment.status_history.all()]

    if shipment:
        return jsonify({
            'shipment': shipment.serialize(),
            'status_history': status_history
        }), 200

    else:
        return jsonify({'message': 'No shipment found'}), 404


@delivery.route('/delivery/<int:driver_id>', methods=['GET'])
def get_delivery(driver_id):
    deliveries = Delivery.query.filter_by(driver_id=driver_id).all()
    grouped = []

    for delivery in deliveries:
        shipment = Shipment.query.filter_by(id=delivery.shipments_id).first()
        if shipment:
            grouped.append({
                "id": delivery.id,
                "task": delivery.task,
                "parcel": shipment.parcel,
                "sender_location": shipment.location.sender_location,
                "reciever_location": shipment.location.reciever_location,
                "sender_coordinates": shipment.location.sender_coordinates,
                "reciever_coordinates": shipment.location.reciever_coordinates,
                "description": delivery.description,
                "status": delivery.status,
            })

    if grouped:
        return jsonify(grouped), 200
    else:
        return jsonify({'message': 'No shipments available'}), 404


