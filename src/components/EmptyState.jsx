import Button from "./Button";
import Heading from "./Heading";
import { AiOutlinePlus } from "react-icons/ai";
function EmptyState({
  title = "No exact matches",
  subtitle = "Try changing or removing some of your filters.",
  showReset,
  label,
   onClick,
}) {
 

  return (
    <>
    <div 
      className="
        h-[60vh]
        flex 
        flex-col 
        gap-2 
        justify-center 
        items-center 
      "
    >
      <Heading
        center
        title={title}
        subtitle={subtitle}
      />
      <div  className="w-48 mt-4">
       
          <Button
            outline
onClick={onClick}
            label={label}
              icon={AiOutlinePlus}
       
          />
      
      </div>
    </div>
    </>
  )
}

export default EmptyState
