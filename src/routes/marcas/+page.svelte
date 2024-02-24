<script lang="ts">
  import { onMount } from 'svelte';
  import { baseURL } from '@/config';
  import { page } from '$app/stores';
  import { get } from 'svelte/store';

  interface Producto {
    id: number;
    attributes: {
      nombre: string;
      descripcion: string;
      precio: number;
      slug: string;
      createdAt: string;
      updatedAt: string;
      publishedAt: string;
      foto: {
        data: {
          attributes: {
            url: string;
          };
        }[];
      };
    };
  }

  interface Marca {
    id: number;
    attributes: {
      Nombre: string;
      slug: string;
      createdAt: string;
      updatedAt: string;
      publishedAt: string;
      productos: {
        data: Producto[];
      };
    };
  }

  let marcas: Marca[] = [];

  onMount(async () => {
    try {
      const response = await fetch(`${baseURL}/api/marcas?populate[productos][populate]=foto`);
      if (response.ok) {
        const data = await response.json();
        marcas = data.data;
      } else {
        console.error('API fetch failed:', response.statusText);
      }
    } catch (error) {
      console.error('Fetch error:', error);
    }
  });
</script>

<div class="container mx-auto px-4">
  <h1 class="text-4xl font-bold text-center my-10">Marcas</h1>
  <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {#each marcas as {attributes: marca}}
          <div class="card card-compact bg-base-100 shadow-xl hover:shadow-2xl transition-shadow duration-300">
              <div class="h-48 bg-gray-200">
                  <img src={marca.productos.data[0]?.attributes.foto.data[0]?.attributes.url || '/default-placeholder.png'} alt={marca.Nombre} class="object-cover h-full w-full" loading="lazy" />
              </div>
              <div class="card-body">
                  <h3 class="card-title text-base md:text-lg font-bold">{marca.Nombre}</h3>
                  <div class="flex flex-wrap justify-between items-center mt-4 gap-2">
                      <span class="text-sm md:text-lg font-bold">Productos: {marca.productos.data.length}</span>
                      <a href={`/marcas/${marca.slug}`} class="btn btn-primary text-xs md:text-base px-2 md:px-4 py-1 md:py-2">Ver Más</a>
                  </div>
              </div>
          </div>
      {/each}
  </div>
</div>

<style>
  /* Add your custom styles here */
</style>
