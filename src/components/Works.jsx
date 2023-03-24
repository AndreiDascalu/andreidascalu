import React from "react";
import Tilt from "react-tilt";
import { motion } from "framer-motion";

import { styles } from "../styles";
import { github } from "../assets";
import { SectionWrapper } from "../hoc";
import { projects } from "../constants";
import { fadeIn, textVariant } from "../utils/motion";

const ProjectCard = ({
  index,
  name,
  description,
  tags,
  image,
}) => {
  return (
   <motion.div variants={fadeIn("up","spring",index*0.5,0.75)}>
    <Tilt options={
      {max:45,
      scale:1,
      speed:450
      }
    }
    className="bg-tertiary p-3 rounded-2xl sm:w-[360px] w-full"
    >
      <div className="relative w-full h-[230px]">
        <img src={image} alt={name} 
        className="w-full h-full object-cover rounded-2xl">
        </img>
      </div>

      <div className="mt-5">
        <h3 className="text-white font-bold text-[24px]">
          {name}
        </h3>
        <p className="mt-2 text-secondary text-[16px]">{description}</p>
      </div>

      <div className='mt-4 flex flex-wrap gap-2'>
          {tags.map((tag) => (
            <p
              key={tag.name}
              className={`text-[14px] ${tag.color}`}
            >
              #{tag.name}
            </p>
          ))}
        </div>

    </Tilt>

   </motion.div>
    
  )
}

const Works = () => {
  return (
    <>
      <motion.div variants={textVariant()}>
        <p className={`${styles.sectionSubText} `}>My work</p>
        <h2 className={`${styles.sectionHeadText}`}>Projects.</h2>
      </motion.div>

      <div className='w-full flex'>
        <motion.p
          variants={fadeIn("", "", 0.1, 1)}
          className='mt-3 text-secondary text-[17px] max-w-3xl leading-[30px]'
        >
          In the following section, I present a selection of projects 
          that I have been involved in developing. These projects represent
          a mix of university projects from courses that are part of the
          Computer Science and Engineering bachelors programme, as well as
          projects that stem out of personal interest for software development.

        </motion.p>
      </div>

      <div className='mt-20 flex flex-wrap gap-7'>
        {projects.map((project, index) => (
          <ProjectCard key={`project-${index}`} index={index} {...project} />
        ))}
      </div>
    </>
  );
};

export default SectionWrapper(Works, "");