import Gun from 'gun';
import 'gun/sea';
import 'gun/axe'; 

const peers = ['https://gun-server-t0uj.onrender.com/gun']
const gunInstance = new Gun({ peers });

export default gunInstance;
