<script lang="ts">
    import { onMount } from 'svelte';
    import { baseURL } from '@/config';
  
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
        const response = await fetch(`${baseURL}/api/marcas?populate=*`);
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
    {#each marcas as {attributes: marca}}
      <div class="marca mb-8">
        <h2 class="text-3xl font-semibold">{marca.Nombre}</h2>
        {#if marca.productos.data.length > 0}
          <div class="productos mt-4">
            {#each marca.productos.data as {attributes: producto}}
              <div class="producto mb-4">
                <h3 class="text-2xl">{producto.nombre}</h3>
                <p>{producto.descripcion}</p>
                <span class="text-lg font-bold">$ {producto.precio}</span>
              </div>
            {/each}
          </div>
        {:else}
          <p>No products found for this brand.</p>
        {/if}
      </div>
    {/each}
  </div>
  
  <style>
    /* Add your styles here */
  </style>
  