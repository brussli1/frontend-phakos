<script>
  // Import necessary DaisyUI components
  import Card from 'daisyui/lib/card/card.svelte';
  import CardBody from 'daisyui/lib/card/cardbody.svelte';
  import CardHeader from 'daisyui/lib/card/cardheader.svelte';
  import CardFooter from 'daisyui/lib/card/cardfooter.svelte';
  import CardText from 'daisyui/lib/card/cardtext.svelte';
  import CardLink from 'daisyui/lib/card/cardlink.svelte';
  import CardPrice from 'daisyui/lib/card/cardprice.svelte';

  // ... other code
</script>

<script context="module">
  // ... (load function and error handling)

  let productos = null;

  export async function load({ params }) {
    // ... (fetch data and assign to productos)
  }
</script>

{#if categoria && productos}
  <div class="container mx-auto">
    <h1 class="text-4xl font-bold text-center my-10">{categoria.categoria}</h1>

    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {#each productos as producto}
        <Card>
          <CardHeader>{producto.attributes.nombre}</CardHeader>
          <CardBody>
            <img src={producto.attributes.foto ? producto.attributes.foto : 'default-placeholder.png'} alt={producto.attributes.nombre} class="h-48 object-cover" />
            <CardText>{producto.attributes.descripcion}</CardText>
          </CardBody>
          <CardFooter>
            <CardLink href={`/productos/${producto.attributes.slug}`}>Ver Detalle</CardLink>
            <CardPrice>{producto.attributes.precio}</CardPrice>
          </CardFooter>
        </Card>
      {/each}
    </div>
  </div>
{:else}
  <p>Category or products not found.</p>
{/if}
