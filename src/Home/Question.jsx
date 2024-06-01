

const Question = () => {
    return (
        <div>
        <div className='my-24 md:mx-6'>
        <h1  data-aos="fade-down"
        data-aos-duration="1500" className='text-3xl mt-7 font-bold text-yellow-600 text-center my-6'>Frequently Asked?</h1>
        <div className='max-w-5xl mx-auto md:flex lg:flex justify-between items-center my-6 mt-12 '>
        <div  data-aos="fade-down"
        data-aos-duration="3000" className='lg:w-1/3'>
        <img  src="https://i.postimg.cc/kGGt1sbD/question-box-9890616-8022563.png" alt="" />
      </div>
        <div  data-aos="fade-up"
        data-aos-duration="3000" className='w-[95%] mx-auto lg:w-1/2  '>
        <div className="collapse bg-base-200 mb-1">
        <input type="radio" name="my-accordion-1" defaultChecked /> 
        <div className="collapse-title text-xl font-medium bg-slate-300">
        What is Employee Management?
        </div>
        <div className="collapse-content bg-slate-200"> 
          <p>Welcome to EmpowerManagement! We specialize in simplifying HR processes, boosting employee productivity, and fostering a positive work culture. Our platform offers tailored solutions to meet your organization's unique needs. Empower your workforce and elevate your business with us!</p>
        </div>
      </div>
      <div className="collapse bg-base-200 mb-1">
        <input type="radio" name="my-accordion-1" /> 
        <div className="collapse-title text-xl font-medium bg-slate-300">
        What services do you offer for employee management?
        </div>
        <div className="collapse-content bg-slate-200"> 
          <p>We offer a comprehensive suite of employee management services, including but not limited to onboarding, payroll management, performance tracking, attendance management, HR analytics, employee self-service, recruitment management, training and development, compliance management, and employee engagement.</p>
        </div>
      </div>
      <div className="collapse bg-base-200 mb-1">
        <input type="radio" name="my-accordion-1" /> 
        <div className="collapse-title text-xl font-medium bg-slate-300">
        How does HR analytics benefit organizations?
        </div>
        <div className="collapse-content bg-slate-200"> 
          <p>HR analytics provides valuable insights into workforce metrics, trends, and predictions. It supports data-driven decision-making in recruitment, training, engagement, and overall HR strategy.</p>
        </div>
      </div>
      <div className="collapse bg-base-200 mb-1">
        <input type="radio" name="my-accordion-1" /> 
        <div className="collapse-title text-xl font-medium bg-slate-300">
        How does recruitment management help in hiring?
        </div>
        <div className="collapse-content bg-slate-200"> 
          <p>Our recruitment management service streamlines the hiring process with tools for job posting, applicant tracking, and interview scheduling. It helps find the best talent efficiently and improves time-to-hire.</p>
        </div>
      </div>
        </div>
        
    </div>
        </div>
        </div>
    );
};

export default Question;