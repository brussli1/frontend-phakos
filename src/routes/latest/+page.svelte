<script lang="ts">
    import { onMount } from 'svelte';
    import { baseURL } from '@/config';
  
    interface Product {
      id: number;
      attributes: {
        nombre: string;
        descripcion: string;
        precio: number;
        slug: string;
        // Include other attributes as needed
      };
    }
  
    // Assuming "Lo Nuevo" only has one set of products, no need for a slug
    let productos: Product[] = [];
  
    onMount(async () => {
      try {
        const response = await fetch(`${baseURL}/api/lo-nuevos?populate=*`);
        if (response.ok) {
          const data = await response.json();
          // Assuming the first item in the data array is what you want to display
          productos = data.data[0].attributes.productos.data;
        } else {
          console.error('API fetch failed:', response.statusText);
        }
      } catch (error) {
        console.error('Fetch error:', error);
      }
    });
  </script>
  
  {#if productos.length > 0}
    <div class="container mx-auto">
      <h1 class="text-4xl font-bold text-center my-10">Lo Nuevo</h1>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        {#each productos as producto}
          <div class="card bg-base-100 shadow-xl">
            <figure class="h-96 bg-gray-200">
              <!-- Adjust the image source based on your actual data structure -->
              <img src="/default-placeholder.png" alt={producto.attributes.nombre} class="object-cover h-full w-full" />
            </figure>
            <div class="card-body">
              <h2 class="card-title text-2xl font-bold">{producto.attributes.nombre}</h2>
              <p class="my-4">{producto.attributes.descripcion}</p>
              <span class="text-lg font-bold">${producto.attributes.precio}</span>
              <!-- Include additional product details as needed -->
            </div>
          </div>
        {/each}
      </div>
    </div>
  {:else}
    <p>Loading...</p>
  {/if}
  