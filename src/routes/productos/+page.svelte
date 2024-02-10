<script lang="ts">
    import { onMount } from 'svelte';
  
    let products = [];
  
    onMount(async () => {
        try {
            const response = await fetch('http://localhost:1337/api/products');
            if (response.ok) {
                const data = await response.json();
                products = data.data; // Assuming the API returns data in { data: [...] } format
            } else {
                console.error('API fetch failed:', response.statusText);
            }
        } catch (error) {
            console.error('Fetch error:', error);
        }
    });
  </script>
  <div data-theme="emerald" class="container px-4 mx-auto">
    <h1 class="text-4xl font-bold text-center my-10">Phakos Store</h1>
    
    <!-- Products Section -->
    <div>
      <h2 class="text-2xl font-bold mb-6">Productos</h2>
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {#each products as product}
          <div class="card card-compact bg-base-100 shadow-xl hover:shadow-2xl transition-shadow duration-300">
            <figure class="h-48 bg-gray-200">
              <img src={product.attributes.image_url || 'default-placeholder.png'} alt={product.attributes.nombre} class="object-cover h-full w-full" />
            </figure>
            <div class="card-body">
              <h3 class="card-title">{product.attributes.nombre}</h3>
              <div class="flex justify-between items-center mt-4">
                <span class="text-lg font-bold">${product.attributes.Precio}</span>
                <button class="btn btn-primary">Contactar</button>
              </div>
            </div>
          </div>
        {/each}
      </div>
    </div>
  </div>
  
  <style>
    /* Custom styles can be added here if needed */
  </style>
  