import { ProjectCard } from "../ProjectCard";
import iotImage from "@assets/generated_images/IoT_fire_detection_project_273c6fe0.png";

export default function ProjectCardExample() {
  return (
    <div className="p-8">
      <ProjectCard
        title="Fire Detection & Control System"
        category="IoT"
        description="Industrial fire detection and control system using NodeMCU and cloud integration"
        tags={["IoT", "NodeMCU", "Cloud", "Sensors"]}
        image={iotImage}
        index={0}
      />
    </div>
  );
}
