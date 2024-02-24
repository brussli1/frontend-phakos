<script lang="ts">
    import { onMount } from 'svelte';
    import { baseURL } from '@/config';
  
    export let slug; // slug parameter from the URL
  
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
  
    let marca: Marca;
    
    onMount(async () => {
      try {
        const response = await fetch(`${baseURL}/api/marcas?populate[productos][populate]=foto`);
        if (response.ok) {
          const data = await response.json();
          marca = data.data;
          console.log(marca)
          console.log('Marca:', marca);
        } else {
          console.error('API fetch failed:', response.statusText);
        }
      } catch (error) {
        console.error('Fetch error:', error);
      }
    });
  </script>
  
  <div class="container mx-auto px-4">
    <h1 class="text-4xl font-bold text-center my-10">{marca?.attributes.Nombre}</h1>
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {#each marca?.attributes.productos.data as producto}
            <div class="card card-compact bg-base-100 shadow-xl hover:shadow-2xl transition-shadow duration-300">
                <div class="h-48 bg-gray-200">
                    <img src={producto.attributes.foto.data[0]?.attributes.url || '/default-placeholder.png'} alt={producto.attributes.nombre} class="object-cover h-full w-full" loading="lazy" />
                </div>
                <div class="card-body">
                    <h3 class="card-title text-base md:text-lg font-bold">{producto.attributes.nombre}</h3>
                    <p>{producto.attributes.descripcion}</p>
                    <span class="text-lg font-bold">$ {producto.attributes.precio}</span>
                </div>
            </div>
        {/each}
    </div>
  </div>
  
  <style>
    /* Add your custom styles here */
  </style>
  