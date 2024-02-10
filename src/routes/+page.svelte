<script lang="ts">
  import { onMount } from 'svelte';

  const baseURL = 'http://localhost:1337'; // Base URL of your Strapi instance
  let carouselItems = [];

  onMount(async () => {
    try {
      const response = await fetch(`${baseURL}/api/carrusels?populate=*`);
      if (response.ok) {
        const data = await response.json();
        carouselItems = data.data.map((item, index) => {
          const imgData = item.attributes.img.data[0];
          if (imgData && imgData.attributes) {
            const imageUrl = imgData.attributes.url.startsWith('/')
              ? baseURL + imgData.attributes.url
              : imgData.attributes.url;
            const altText = imgData.attributes.alternativeText || `Carousel image ${index + 1}`;
            return { id: `item${index + 1}`, url: imageUrl, alt: altText };
          }
          return null;
        }).filter(Boolean); // Remove null entries
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

<header class="my-12 text-center">
  <h1 class="text-5xl font-bold mb-4">Phakos</h1>
  <p class="text-xl">Explorar nuestros mejores productos</p>
  
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
