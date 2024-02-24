<script lang="ts">
    import { onMount } from 'svelte';
    import { baseURL } from '@/config';

    interface CarouselItem {
        id: string;
        url: string;
        alt: string;
    }

    interface Product {
      attributes: {
        nombre: string;
        precio: number;
        slug: string;
        foto: {
          data: {
              attributes: {
                url: string;
              };
          } [] |  null;
        };
      };
       imageUrl?: string;
    }

    let carouselItems: CarouselItem[] = [];
    let productos: Product[] = [];
    let popularProducts: Product[] = [];
    let counter = 1

    // Fetch Carousel Items
    onMount(async () => {
    try {
        const response = await fetch(`${baseURL}/api/carrusels?populate=*`);
        if (response.ok) {
        const data = await response.json();
        carouselItems = data.data.map((carouselEntry) => {
            return carouselEntry.attributes.carrusel.data.map((item, index) => {
            const imgData = item.attributes;
            const imageUrl = imgData.url.startsWith('/') ? `${baseURL}${imgData.url}` : imgData.url;
            const altText = imgData.alternativeText || `Carousel image ${index + 1}`;
            // Use carousel entry slug for each item, assuming it matches the product slug
            const slug = carouselEntry.attributes.slug; 
            const itemID = `item${counter++}`;
            return { id: itemID, url: imageUrl, alt: altText, slug: slug };
            });
        }).flat().filter(Boolean); // Flatten in case of multiple carousel entries and filter out any non-truthy values
        } else {
        console.error('API fetch failed:', response.statusText);
        }
    } catch (error) {
        console.error('Fetch error:', error);
    }
    });


    //lonuevo
    onMount(async () => {
            try {
                const response = await fetch(`${baseURL}/api/lo-nuevos?populate[productos][populate]=foto`);
                if (response.ok) {
                    const data = await response.json();
                    // Accessing the nested 'productos' array within the first 'lo-nuevos' entry
                    productos = data.data[0].attributes.productos.data.map((producto) => {
                        // Assuming 'foto' is directly under 'attributes' and has a 'data' array
                        const imageUrl = producto.attributes.foto?.data?.[0]?.attributes?.url
                            ? `${baseURL}${producto.attributes.foto.data[0].attributes.url}`
                            : 'default-placeholder.png'; // Providing a default image
                        return {
                            ...producto.attributes,
                            id: producto.id,
                            imageUrl: imageUrl,
                        };
                    });
                } else {
                    console.error('API fetch failed:', response.statusText);
                }
            } catch (error) {
                console.error('Fetch error:', error);
            }
        });


    

// Fetch "Popular" Products
    onMount(async () => {
        // Previous fetch calls remain unchanged

        // New fetch call for "Popular" products
        try {
            const response = await fetch(`${baseURL}/api/populars?populate[productos][populate]=foto`);
            if (response.ok) {
                const data = await response.json();
                // Accessing the nested 'productos' array within the first 'popular' entry
                productos = data.data[0].attributes.productos.data.map((producto) => {
                    // Assuming 'foto' is directly under 'attributes' and has a 'data' array
                    const imageUrl = producto.attributes.foto?.data?.[0]?.attributes?.url
                        ? `${baseURL}${producto.attributes.foto.data[0].attributes.url}`
                        : 'default-placeholder.png'; // Providing a default image
                    return {
                        ...producto.attributes,
                        id: producto.id,
                        imageUrl: imageUrl,
                    };
                });
            } else {
                console.error('API fetch failed:', response.statusText);
            }
        } catch (error) {
            console.error('Fetch error:', error);
        }
    });

</script>
<div data-theme="emerald" class="flex bg-transparent ">	
    <div class="container mx-auto px-4 rounded ">
        <header class="my-5 text-center">
            <h1 class="text-3xl mb-5 border-b tracking-wide shadow py-2 font-semibold bg-gray-200">Explora Nuestros Mejores Productos</h1>
            <div class="carousel w-full ">
                {#each carouselItems as item (item.id)}
                  <div id={item.id} class="carousel-item w-full flex justify-center ">
                    <!-- Navigate to the product page based on the slug -->
                    <a href={`/productos/${item.slug}`} class= "justify-center">
                      <img src={item.url} class="responsive-img w-full  justify-center" alt={item.alt} />
                    </a>
                  </div>
                {/each}
            </div>
              
    
            <div class="flex justify-center w-full h-12 py-2 gap-2">
                {#each carouselItems as item (item.id)}
                    <a href={`#${item.id}`} class="btn btn-xs">{item.id.replace('item', '')}</a>
                {/each}
            </div>


            <!--div class="carousel w-full">
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
            </div-->
        </header>

        <!-- "Lo Nuevo" Products Section -->

        <div class="divider"></div> 
            <!-- Products Section -->
            {#if productos.length > 0}
            <div class="container px-4 mx-auto">
                <h1 class="text-4xl font-bold text-center my-10">Lo Nuevo</h1>
                <!-- <h2 class="text-2xl font-bold mb-6">Productos</h2> -->
                <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {#each productos as producto}
                        <!-- Use rel="prefetch" for SvelteKit prefetching and replace {producto.imageUrl} with actual image path -->
                        <a href={`/productos/${producto.slug}`} class="card card-compact bg-base-100 shadow-xl hover:shadow-2xl transition-shadow duration-300" rel="prefetch">
                            <figure class="h-48 bg-gray-200">
                                <!-- Apply lazy loading for images. Adjust the src attribute as needed. -->
                                <img src={producto.imageUrl || '/default-placeholder.png'} alt={producto.nombre} class="object-cover h-full w-full" loading="lazy" />
                            </figure>
                            <div class="card-body">
                                <h3 class="card-title text-base md:text-lg font-bold">{producto.nombre}</h3>
                                <div class="flex flex-wrap justify-between items-center mt-4 gap-2">
                                    <span class="text-sm md:text-lg font-bold">${producto.precio}</span>
                                    <button class="btn btn-primary text-xs md:text-base px-2 md:px-4 py-1 md:py-2">Contactar</button>
                                </div>
                            </div>                        
                        </a>
                    {/each}
                </div>
            </div>
            {:else}
            <p class="text-center">Cargando...</p>
            {/if}

        <!-- "Popular" Products Section -->
        <div class="divider"></div> 
        <!-- Popular Products Section -->
        {#if productos.length > 0}
            <div class="container px-4 mx-auto">
                <h1 class="text-4xl font-bold text-center my-10">Popular</h1>
                <h2 class="text-2xl font-bold mb-6">Productos Populares</h2>
                <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {#each productos as producto}
                        <!-- Use rel="prefetch" for SvelteKit prefetching and replace {producto.imageUrl} with actual image path -->
                        <a href={`/productos/${producto.slug}`} class="card card-compact bg-base-100 shadow-xl hover:shadow-2xl transition-shadow duration-300" rel="prefetch">
                            <figure class="h-48 bg-gray-200">
                                <!-- Apply lazy loading for images. Adjust the src attribute as needed. -->
                                <img src={producto.imageUrl || '/default-placeholder.png'} alt={producto.nombre} class="object-cover h-full w-full" loading="lazy" />
                            </figure>
                            <div class="card-body">
                                <h3 class="card-title text-base md:text-lg font-bold">{producto.nombre}</h3>
                                <div class="flex flex-wrap justify-between items-center mt-4 gap-2">
                                    <span class="text-sm md:text-lg font-bold">${producto.precio}</span>
                                    <button class="btn btn-primary text-xs md:text-base px-2 md:px-4 py-1 md:py-2">Contactar</button>
                                </div>
                            </div>                        
                        </a>
                    {/each}
                </div>
            </div>
        {:else}
            <p class="text-center">Cargando...</p>
        {/if}
    </div>  
</div>	
<div class="divider"></div> 
<style>
    .responsive-img {
        width: 100%;
        max-height: 400px; /* Adjust this value as needed */
    }
    
</style>
