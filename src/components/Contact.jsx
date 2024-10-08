import { useState, useRef } from "react"
import { motion } from "framer-motion"
import emailjs from '@emailjs/browser'
import { styles } from "../styles";
import { EarthCanvas } from "./canvas";
import { SectionWrapper } from "../hoc"
import { slideIn } from "../utils/motion";

//template_hs8s7o7
//service_beufqo5
//UuzMnrAymnpYezPYL
const Contact = () => {
  const formRef = useRef()
  const [form, setform] = useState({
    name: "",
    email: "", 
    message: "",
  })

  const [loading, setloading] = useState(false)

  const handleChange = (e) => {
    const {name,value} = e.target;
    setform({...form, [name]:value})

  }

  const handleSubmit = (e) => {
    e.preventDefault()
  
    emailjs.send("service_beufqo5", "template_hs8s7o7", 
    {
      from_name: form.name,
      to_name: "Andrei",
      from_email: form.email,
      to_email: "dascaluandrei172001@gmail.com",
      message: form.message,
    },
    "UuzMnrAymnpYezPYL"
    )
    .then(() => {
      setloading(false)
      alert("Thank you! I will get back to you as soon as possible.")

      setform({
        name:"",
        email:"",
        message:"",
      })
    },(error) =>{
      setloading(false)
      console.log(error)
      alert("Something went wrong")
    }
    )
  }

  return (
    <div className="xl:mt-12 xl:flex-row 
    flex-col-reverse flex gap-10 overflow-hidden">
      <motion.div variants={slideIn("left","tween",0.2,1)}
      className="flex-[0.75] bg-black-100 p-8 rounded-2xl"
      >
        <p className={styles.sectionSubText}>Get in touch</p>
        <h3 className={styles.sectionHeadText}>Contact</h3>
        <form ref={formRef}
        onSubmit={handleSubmit}
        className="mt-12 flex flex-col gap-8"
        >
          <label className="flex flex-col">
            <span className="text-white font-medium mb-4">
              Your name
            </span>
            <input type="text" name = "name" value = {form.name}
            onChange = {handleChange} placeholder="What's your name?"
            className="bg-tertiary py-4 px-6 placeholder:text-secondary
            text-white rounded-lg outlined-none border-none font-medium"
            >
            </input>

          </label>

          <label className="flex flex-col">
            <span className="text-white font-medium mb-4">
              Your email address
            </span>
            <input type="email" name = "email" value = {form.email}
            onChange = {handleChange} placeholder="What's your email?"
            className="bg-tertiary py-4 px-6 placeholder:text-secondary
            text-white rounded-lg outlined-none border-none font-medium"
            >
            </input>
            
          </label>

          <label className="flex flex-col">
            <span className="text-white font-medium mb-4">
              Your message
            </span>
            <textarea rows ="7" type="text" name = "message" value = {form.message}
            onChange = {handleChange} placeholder="What's your message?"
            className="bg-tertiary py-4 px-6 placeholder:text-secondary
            text-white rounded-lg outlined-none border-none font-medium"
            >
            </textarea>
            
          </label>
          <button type ="submit"
          className="outline-none font-bold shadow-md shadow-primary
          rounded-xl bg-tertiary py-3 px-8 w-fit text-white"
          >
            {loading?"Sending...":"Send"}
          </button>
        </form>
      </motion.div>

      <motion.div variants={slideIn("right","tween",0.2,1)}
      className="xl:flex-1 xl:h-auto md:h-[550px] h-[350px]">
        <EarthCanvas/>
      </motion.div>
    </div>
  )
}

export default SectionWrapper(Contact, "contact")