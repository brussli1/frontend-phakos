<script lang="ts">
    import { onMount } from 'svelte';
    
    // Define the type for categories and products based on the JSON structure
    type Product = {
      id: number;
      attributes: {
        nombre: string;
        descripcion: string;
        precio: number;
        slug: string;
        createdAt: string;
        updatedAt: string;
        publishedAt: string;
        foto?: {
          data: {
            attributes: {
              url: string;
            }
          }[]
        };
      };
    };
  
    type Category = {
      id: number;
      attributes: {
        categoria: string;
        slug: string;
        productos: {
          data: Product[];
        };
      };
    };
  
    let categories: Category[] = [];
  
    onMount(async () => {
    try {
        const strapiBaseURL = 'http://168.138.133.221:1337';
        const response = await fetch(`${strapiBaseURL}/api/categorias?populate=*`);
        if (response.ok) {
        const data = await response.json();
        console.log(data); // Debug the response
        categories = data.data;
        } else {
        console.error('API fetch failed:', response.statusText);
        }
    } catch (error) {
        console.error('Fetch error:', error);
    }
    });
</script>
  
  <div data-theme="emerald" class="container px-4 mx-au bg-transparent">
    <h1 class="text-4xl font-bold text-center my-10">Categorías</h1>
    
    <!-- Categories Section -->
    {#each categories as category}
      <div>
        <h2 class="text-2xl font-bold mb-6">{category.attributes.categoria}</h2>
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {#each category.attributes.productos.data as producto}
            <a href={`/productos/${producto.attributes.slug}`} class="card card-compact shadow-xl hover:shadow-2xl transition-shadow duration-300" sveltekit:prefetch>
              <figure class="h-48">
                <img src={producto.attributes.foto?.data?.[0]?.attributes?.url || "/default-placeholder.png"} alt={producto.attributes.nombre} class="object-cover h-full w-full" />
              </figure>
              <div class="card-body">
                <h3 class="card-title">{producto.attributes.nombre}</h3>
                <div class="flex justify-between items-center mt-4">
                  <span class="text-lg font-bold">${producto.attributes.precio}</span>
                  <button class="btn btn-primary">Ver</button>
                </div>
              </div>
            </a>
          {/each}
        </div>
      </div>
    {/each}
  </div>
  
  <style>
    /* Custom styles if needed */
  </style>
  