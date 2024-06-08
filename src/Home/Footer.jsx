

const Footer = () => {
    return (
        <div >
        <div>
        <footer className="footer p-10 bg-neutral text-neutral-content ">
        <nav>
          <h6 className="footer-title">Services</h6> 
          <a className="link link-hover">Employee management</a>
          <a className="link link-hover">Payroll Processing</a>
          <a className="link link-hover">Marketing</a>
          <a className="link link-hover">Employee Self-Service Portals</a>
        </nav> 
        <nav>
          <h6 className="footer-title">Company</h6> 
          <a className="link link-hover">About us</a>
          <a className="link link-hover">Contact</a>
          <a className="link link-hover">Jobs</a>
          <a className="link link-hover">Press kit</a>
        </nav> 
        <nav>
          <h6 className="footer-title">Legal</h6> 
          <a className="link link-hover">Terms of use</a>
          <a className="link link-hover">Privacy policy</a>
          <a className="link link-hover">Cookie policy</a>
        </nav>
      </footer>
        </div>  
        </div>
    );
};

export default Footer;