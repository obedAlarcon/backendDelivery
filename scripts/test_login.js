(async ()=>{
  try{
    const res = await fetch('http://localhost:4001/api/v1/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: 'test@example.com', password: 'secret123' })
    });
    const text = await res.text();
    console.log('Status:', res.status);
    console.log(text);
  }catch(err){
    console.error('Request failed:', err);
  }
})();
