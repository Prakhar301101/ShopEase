const authorisation = async (req, res,next) => {
  let token = req.cookies.jwt;
  let bearer="";
  if(req.headers.authorization){
    bearer=req.headers.authorization.split("Bearer")[1];
    token=bearer.trim();
  }
  try {
    if (token) {
        const response = await fetch('http://localhost:5001/verify', {
            method: 'GET',
            credentials: 'include',
            headers:{
              'Authorization': `Bearer ${token}`, 
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
    } else {
        return res.status(400).json({message:'You need to Login or Register first'})
    }
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      message: 'Error while authorising',
    });
  }
};

module.exports=authorisation;