const PRODUCTS = [
      {id:'roller', name:'Motorized Roller Shade', price:229, img:'resources/blind1.jpg', options:['Blackout','Light‑filter','Textured Linen']},
      {id:'zebra', name:'Zebra (Dual) Shade', price:259, img:'resources/blind2.jpg', options:['White','Gray','Charcoal']},
      {id:'cellular', name:'Cellular (Honeycomb) Shade', price:279, img:'resources/blind3.jpg', options:['Single','Double','Blackout']},
      {id:'sheer', name:'Sheer Shade', price:289, img:'resources/blind4.jpg', options:['Ivory','Sand','Smoke']},
      {id:'roman', name:'Roman Shade', price:309, img:'resources/blind5.jpg', options:['Cotton','Linen','Velvet']},
      {id:'drapery', name:'Smart Drapery (Tracks)', price:399, img:'resources/blind6.jpg', options:['Sheer','Blackout','Wave Fold']},
    ];
  
    const cart = JSON.parse(localStorage.getItem('dl_cart')||'[]');
  
    function saveCart(){ localStorage.setItem('dl_cart', JSON.stringify(cart)); document.getElementById('count').textContent = cart.length; renderCart(); }
    function toggleCart(){ document.getElementById('cart').classList.toggle('open'); }
    function addToCart(id){
      const p = PRODUCTS.find(x=>x.id===id);
      const size = prompt('Enter width × height (inches), e.g., 34x60');
      const fabric = prompt('Fabric (e.g., Blackout / Linen / Sheer)');
      cart.push({id, qty:1, size, fabric, name:p.name, price:p.price});
      saveCart();
      toggleCart();
    }
    function removeFromCart(i){ cart.splice(i,1); saveCart(); }
    function emailQuote(){
      const lines = cart.map(c=>`• ${c.name} — ${c.size||'size?'} — ${c.fabric||'fabric?'} — $${c.price}`);
      const body = encodeURIComponent(`Hi Design Luxe,%0D%0A%0D%0APlease quote the following:%0D%0A${lines.join('%0D%0A')}%0D%0A%0D%0AName:%0D%0APhone:%0D%0AAddress:`);
      window.location.href = `mailto:support@designluxe.net?subject=Quote%20Request&body=${body}`;
    }
  
    function renderProducts(){
      const grid = document.getElementById('gridProducts');
      grid.innerHTML = PRODUCTS.map(p=>`
        <div class="product card pad">
          <div class="img" role="img" aria-label="${p.name}">
            <img src="${p.img}" alt="${p.name}" class="product-image"/>
          </div>
          <div class="title">${p.name}</div>
          <div class="muted">$${p.price} base</div>
          <button class="btn gold" onclick="addToCart('${p.id}')">Add to Quote</button>
        </div>
      `).join('');
      const mini = document.getElementById('miniProducts');
      mini.innerHTML = PRODUCTS.slice(0,3).map(p=>`<div class="feature"><div class="pill">${p.name}</div><button class="btn" onclick="addToCart('${p.id}')">Add</button></div>`).join('');
    }
  
    function renderCart(){
      const el = document.getElementById('cartItems');
      if(!el) return;
      if(!cart.length){ el.innerHTML = '<p class="muted">Your quote is empty.</p>'; return; }
      el.innerHTML = cart.map((c,i)=>`
        <div class="card pad">
          <strong>${c.name}</strong>
          <div class="muted">${c.size||'size?'} · ${c.fabric||'fabric?'}</div>
          <div style="display:flex;justify-content:space-between;align-items:center;margin-top:8px">
            <span>${c.qty} × $${c.price}</span>
            <button class="btn" onclick="removeFromCart(${i})">Remove</button>
          </div>
        </div>
      `).join('');
    }
  
    document.getElementById('year').textContent = new Date().getFullYear();
    renderProducts(); saveCart();