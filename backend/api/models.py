from api import db
from datetime import datetime, timedelta
from time import time
from werkzeug.security import generate_password_hash, check_password_hash
from hashlib import md5
from sqlalchemy.dialects.postgresql import ARRAY

class AccidentReport(db.Model):
    __tablename__ = 'accident_reports'

    id = db.Column(db.Integer, primary_key=True)
    location_description = db.Column(db.Text)
    latitude = db.Column(db.Float)
    longitude = db.Column(db.Float)
    date_time = db.Column(db.DateTime)
    accident_type = db.Column(db.String(50))
    severity = db.Column(db.String(20))  # 'minor', 'serious', 'fatal'
    weather = db.Column(db.Text)
    sender_location = db.Column(db.String, nullable=False)
    road_condition = db.Column(db.Text)
    description = db.Column(db.Text)
    status = db.Column(db.String(20), default='Pending')
    created_at = db.Column(db.DateTime, default=datetime.utcnow)

    vehicles = db.relationship('VehicleInvolved', back_populates='report', cascade='all, delete-orphan')
    attachments = db.relationship('Attachment', back_populates='report', cascade='all, delete-orphan')
    updates = db.relationship('ReportUpdate', back_populates='report', cascade='all, delete-orphan')

    def __repr__(self):
        return f'<AccidentReport {self.id}>'

    def serialize(self):
        return {
            'id': self.id,
            'location_description': self.location_description,
            'latitude': self.latitude,
            'longitude': self.longitude,
            'date_time': self.date_time.isoformat() if self.date_time else None,
            'accident_type': self.accident_type,
            'severity': self.severity,
            'status': self.status,
            'description': self.description
        }


class VehicleInvolved(db.Model):
    __tablename__ = 'vehicles_involved'

    id = db.Column(db.Integer, primary_key=True)
    report_id = db.Column(db.Integer, db.ForeignKey('accident_reports.id'))
    plate_number = db.Column(db.String(20))
    make = db.Column(db.String(50))
    model = db.Column(db.String(50))
    color = db.Column(db.String(30))
    year = db.Column(db.Integer)

    report = db.relationship('AccidentReport', back_populates='vehicles')

    def __repr__(self):
        return f'<Vehicle {self.plate_number}>'


class Attachment(db.Model):
    __tablename__ = 'attachments'

    id = db.Column(db.Integer, primary_key=True)
    report_id = db.Column(db.Integer, db.ForeignKey('accident_reports.id'))
    file_type = db.Column(db.String(20))  # 'image', 'video', 'audio'
    file_url = db.Column(db.Text)
    uploaded_at = db.Column(db.DateTime, default=datetime.utcnow)

    report = db.relationship('AccidentReport', back_populates='attachments')

    def __repr__(self):
        return f'<Attachment {self.file_type}>'


class ReportUpdate(db.Model):
    __tablename__ = 'report_updates'

    id = db.Column(db.Integer, primary_key=True)
    report_id = db.Column(db.Integer, db.ForeignKey('accident_reports.id'))
    status = db.Column(db.String(20))  # 'Pending', 'Under Review', 'Verified', 'Closed'
    updated_by = db.Column(db.String(100))
    notes = db.Column(db.Text)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow)

    report = db.relationship('AccidentReport', back_populates='updates')

    def __repr__(self):
        return f'<ReportUpdate {self.status}>'
