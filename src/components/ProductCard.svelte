<script lang="ts">
    export let product: {
      attributes: {
        nombre: string;
        precio: number;
        slug: string;
        foto: {
          data: {
              attributes: {
                url: string;
              };
          }[] | null;
        };
      };
      imageUrl?: string;
    };
  </script>
  
  <a href={`/productos/${product.attributes.slug}`} class="card card-compact bg-base-100 shadow-xl hover:shadow-2xl transition-shadow duration-300" rel="prefetch">
    <figure class="h-48 bg-gray-200">
      <img src={product.imageUrl || '/default-placeholder.png'} alt={product.attributes.nombre} class="object-cover h-full w-full" loading="lazy" />
    </figure>
    <div class="card-body">
      <h3 class="card-title">{product.attributes.nombre}</h3>
      <div class="flex justify-between items-center mt-4">
        <span class="text-lg font-bold">${product.attributes.precio}</span>
        <button class="btn btn-primary">Ver</button>
      </div>
    </div>
  </a>
  