import http from 'node:http';

const css = `
*{box-sizing:border-box}body{margin:0;font:16px/1.5 Arial,sans-serif;background:#f7f7f7;color:#222}
header{padding:22px;background:#c8102e;color:white;text-align:center}h1{margin:0 0 12px}
nav a{color:white;margin:0 10px}main{max-width:900px;margin:35px auto;padding:0 20px}
h2{color:#c8102e}.spaces{display:flex;flex-wrap:wrap;gap:16px}article{flex:1 1 220px}
article,form{padding:22px;background:white;border:1px solid #ddd;border-radius:8px}
form{max-width:420px}label{display:block;margin-bottom:15px}input{display:block;width:100%;margin-top:5px;padding:10px;font:inherit;border:1px solid #999;border-radius:4px}
button{background:#c8102e;color:white;padding:12px;border:0;border-radius:4px;font:inherit;cursor:pointer}
a{color:#b10e29}footer{text-align:center;padding:22px;color:#555}:focus-visible{outline:3px solid #215fbd;outline-offset:3px}
`;
const field = (label,type,extra='') => `<label>${label}<input type="${type}" ${extra} required></label>`;
const home = `<h2>Find your space. Skip the crowd.</h2><p>Check campus crowd levels before heading out.</p><p>Sample data for Milestone 1.</p><section class="spaces" aria-label="Campus facilities"><article><h3>Van Houten Library</h3><p>Moderate</p></article><article><h3>Campus Center Dining</h3><p>Busy</p></article><article><h3>Wellness and Events Center</h3><p>Quiet</p></article></section>`;
const login = `<h2>Login</h2><p>Authentication will be added in Milestone 2.</p><form onsubmit="event.preventDefault();alert('Login is not connected yet. No session was created.');">${field('Username','text','autocomplete="username"')}${field('Password','password','autocomplete="current-password"')}<button>Login</button></form><p>New here? <a href="/register.html">Register</a></p>`;
const register = `<h2>Create an account</h2><p>Account creation will be added in Milestone 2.</p><form onsubmit="event.preventDefault();if(this.elements.password.value!==this.elements.confirm.value){alert('Passwords do not match.');return;}alert('Form complete. Account creation is not connected yet.');">${field('Username','text','autocomplete="username"')}${field('NJIT email','email','pattern=".+@njit\\.edu" placeholder="you@njit.edu" title="Use your @njit.edu email" autocomplete="email"')}${field('Password','password','name="password" minlength="12" autocomplete="new-password"')}<p>Use at least 12 characters.</p>${field('Confirm password','password','name="confirm" autocomplete="new-password"')}<button>Register</button></form><p>Already registered? <a href="/login.html">Login</a></p>`;
const pages = {'/':home,'/index.html':home,'/login':login,'/login.html':login,'/register':register,'/register.html':register};
const layout = content => `<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>CrowdMeter NJIT</title><style>${css}</style></head><body><header><h1>CrowdMeter NJIT</h1><nav aria-label="Main navigation"><a href="/">Home</a><a href="/login.html">Login</a><a href="/register.html">Register</a></nav></header><main>${content}</main><footer>IT 340 · CrowdMeter NJIT</footer></body></html>`;
const port = Number(process.env.PORT || 8081);
http.createServer((req,res) => {
  if(!['GET','HEAD'].includes(req.method)){res.writeHead(405,{Allow:'GET, HEAD'});res.end();return;}
  const page = pages[new URL(req.url,'http://localhost').pathname];
  res.writeHead(page ? 200 : 404,{'Content-Type':'text/html; charset=utf-8','X-Content-Type-Options':'nosniff'});
  res.end(req.method==='HEAD' ? undefined : layout(page || '<h2>Page not found</h2><a href="/">Go home</a>'));
}).listen(port,'0.0.0.0',()=>console.log(`CrowdMeter running at http://localhost:${port}`));
