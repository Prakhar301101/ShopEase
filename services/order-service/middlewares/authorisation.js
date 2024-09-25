const authorisation = async (req, res, next) => { 
    if(req.cookies.jwt){
    try {
      const response = await fetch('http://auth-service:5001/verify', {
        method: 'GET',
        credentials: 'include',
        headers:{
          'Authorization': `Bearer ${req.cookies.jwt}`, 
        }
      });
      if (response) {
        const data=await response.json();
        req.user = data;
        next();
      } else {
        return res.status(400).json({
          message: 'Token verification failed',
        });
      }
    } catch (err) {
      console.error(err);
       return res.status(400).json({
        message: 'Authorisation Failed!!',
      });
    }
  }
  else{
       return res.status(400).json({
        message: 'LogIn/Register First',
      });
  }
  };
  
  module.exports = authorisation;
  