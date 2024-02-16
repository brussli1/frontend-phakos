<script lang="ts">
  import { onMount } from 'svelte';
  import { baseURL } from '/src/config.ts'; // Ensure this is the correct path to your base URL configuration

  let carouselItems = [];

  onMount(async () => {
    try {
      // Fetch data from the API
      const response = await fetch(`${baseURL}/api/carrusels?populate=*`);
      if (response.ok) {
        const data = await response.json();
        // Map through the received data to structure the carousel items
        carouselItems = data.data[0].attributes.carrusel.data.map((item, index) => {
          // Adjusted path to access image data based on the provided structure
          const imgData = item.attributes;
          if (imgData) {
            const imageUrl = imgData.url.startsWith('/')
              ? baseURL + imgData.url
              : imgData.url;
            const altText = imgData.alternativeText || `Carousel image ${index + 1}`;
            return { id: `item${index + 1}`, url: imageUrl, alt: altText };
          }
          return null;
        }).filter(Boolean); // Filter out any null values to ensure only valid items are included
      } else {
        console.error('API fetch failed:', response.statusText);
      }
    } catch (error) {
      console.error('Fetch error:', error);
    }
  });
</script>


<div class="container mx-auto px-4">
<nav class="bg-red-500 text-white p-4">
  <!-- Navigation content here -->
</nav>

<header class="my-5 text-center">
  <h1 class="text-3xl mb-5">Explora Nuestros Mejores Productos</h1>
  <div class="carousel w-full">
    {#each carouselItems as item (item.id)}
      <div id={item.id} class="carousel-item w-full">
        <img src={item.url} class="responsive-img" alt={item.alt} />
      </div>
    {/each}
  </div>

  <div class="flex justify-center w-full h-12 py-2 gap-2">
    {#each carouselItems as item (item.id)}
      <a href={`#${item.id}`} class="btn btn-xs">{item.id.replace('item', '')}</a>
    {/each}
  </div>
</header>

<footer class="bg-red-500 text-white p-4 text-center">
  <!-- Footer content here -->
</footer>
</div>


<style>
  .responsive-img {
    width: 100%;
    max-height: 400px; /* Adjust this value as needed */
    object-fit: cover;
  }
</style>
