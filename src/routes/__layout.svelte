<script>
    import Header from "../components/header.svelte";
    import Footer from "../components/footer.svelte";
    </script>
    
    <style global lang="postcss">
        @tailwind base;
        @tailwind components;
        @tailwind utilities;
    </style>
  
   
      
            <Header />
            <main class="px-6 flex-1">
                <slot />
            </main>
            <Footer />
