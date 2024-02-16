<script lang="ts">
    let name: string = '';
    let email: string = '';
    let message: string = '';
  
    // Define the function with an async arrow function for TypeScript
    const submitForm = async (): Promise<void> => {
            // Placeholder for form submission logic
    console.log({ name, email, message });
    // Here you'd typically make an API call to submit the form data
  };
</script>
<svelte:head>
    <title>Support Page</title>
    <meta name="description" content="Submit your support requests.">
    <meta name="keywords" content="support, help, customer service">
    <!-- Add more meta tags as needed -->
</svelte:head>
<div class="container mx-auto px-4 py-8">
    <h1 class="text-3xl font-bold text-center mb-8">Support</h1>

 <form on:submit|preventDefault={submitForm} class="form-control">
    <label for="name" class="label">
      <span class="label-text">Name</span>
    </label>
    <input type="text" bind:value={name} id="name" class="input input-bordered" required>
  
    <label for="email" class="label">
      <span class="label-text">Email</span>
    </label>
    <input type="email" bind:value={email} id="email" class="input input-bordered" required>
  
    <label for="message" class="label">
      <span class="label-text">Message</span>
    </label>
    <textarea bind:value={message} id="message" class="textarea textarea-bordered" required></textarea>
  
    <button type="submit" class="btn">Submit</button>
  </form>
</div>
