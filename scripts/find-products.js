const API_URL = 'https://events.codewithseth.co.ke/api/v1';

async function searchProducts() {
  try {
    const response = await fetch(`${API_URL}/products?limit=500`);
    const data = await response.json();
    
    const searchTerms = [
      'fridge',
      'electric delivery bed',
      'delivery bed',
      'gyna couch',
      'gynae couch',
      'gynaecological',
      'operating table',
      'dental',
      'blood bank',
      'xray',
      'x-ray',
      'x ray',
      'electric crank bed',
      'crank bed',
      'dialysis chair'
    ];
    
    console.log('Searching for Black November products...\n');
    
    const foundProducts = [];
    
    searchTerms.forEach(term => {
      const matches = data.data.filter(p => 
        p.name.toLowerCase().includes(term.toLowerCase()) ||
        p.description?.toLowerCase().includes(term.toLowerCase())
      );
      
      if (matches.length > 0) {
        console.log(`\n=== Found matches for '${term}': ===`);
        matches.forEach(p => {
          console.log(`ID: ${p.id} | Name: ${p.name}`);
          if (!foundProducts.find(fp => fp.id === p.id)) {
            foundProducts.push(p);
          }
        });
      }
    });
    
    console.log(`\n\n=== SUMMARY ===`);
    console.log(`Total unique products found: ${foundProducts.length}`);
    console.log('\nProduct IDs:', foundProducts.map(p => p.id).join(', '));
    console.log('\n=== Export for code ===');
    console.log('export const BLACK_NOVEMBER_PRODUCT_IDS = [');
    foundProducts.forEach(p => {
      console.log(`  "${p.id}", // ${p.name}`);
    });
    console.log('];');
    
  } catch (error) {
    console.error('Error:', error.message);
  }
}

searchProducts();
