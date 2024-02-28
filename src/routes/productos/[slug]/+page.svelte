<script lang="ts">
  import { onMount } from 'svelte';
  import { baseURL, phoneNumber } from '@/config';
  import { page } from '$app/stores'; // This import allows you to access the page store
  import { get } from 'svelte/store';

  $: slug = get(page).params.slug;
  let producto = null;
  let slug = null;

  function redirectToWhatsApp() {
    if (producto) {
      // Asegurándose de que producto no es null
      const message = encodeURIComponent(`Buenas, estoy interesado en el producto: ${producto.attributes.nombre}, localhost:5173/productos/${slug}`);
      const whatsappUrl = `https://wa.me/${phoneNumber}?text=${message}`;
      window.open(whatsappUrl, '_blank');
    }
  }




  // Get the slug from the page store, which contains parameters of the current route
  

  onMount(async () => {
    try {
      const response = await fetch(`${baseURL}/api/productos?filters[slug]=${slug}&populate=*`);
      if (response.ok) {
        const data = await response.json();
        producto = data.data[0]; // Assuming the API returns the product in an array
      } else {
        console.error('API fetch failed:', response.statusText);
      }
    } catch (error) {
      console.error('Fetch error:', error);
    }
  });
</script>

{#if producto}
  <div class="container mx-auto">
      <h1 class="text-4xl font-bold text-center my-10">{producto.attributes.nombre}</h1>
      
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div class="card">
              <figure class="h-96 bg-gray-200">
                  {#if producto.attributes.foto.data && producto.attributes.foto.data.length > 0}
                  <img src={`${baseURL}${producto.attributes.foto.data[0].attributes.url}`} alt={producto.attributes.nombre} class="" />
                  {:else}
                    <img src="default-placeholder.png" alt="Placeholder" class="object-cover h-full w-full" />
                  {/if}
              </figure>
          </div>
          
          <div class="card-body bg-base-100">
              <h2 class="card-title text-2xl font-bold">{producto.attributes.nombre}</h2>
              <p class="my-4">{producto.attributes.descripcion}</p>
              <span class="text-lg font-bold">Precio: ₲{producto.attributes.precio}</span>
              <button class="btn btn-primary" on:click={redirectToWhatsApp}>Contactar con un representante</button>
              <!-- Add more product details here -->
          </div>
      </div>
  </div>
{:else}
  <p>Loading...</p>
{/if}
  
<div>
<meta property="og:type" content="website">
<meta property="og:url" content="localhost:5173/productos/${slug}">
<meta property="og:title" content="Phakos">
<meta property="og:description" content="Un producto">
<meta property="og:image" content="http://localhost:5173/logo-phakos.png">
</div>
<style>
  /* Custom styles if needed */
</style>
