<script>
import Widget from '$lib/widgets/Widget.svelte';
import Bybane from '$lib/widgets/Bybane.svelte';
import Schoolmodels from '$lib/widgets/Schoolmodels.svelte';

export let title;
export let showcase;
</script>


<section>
  <h2>{title}</h2>
  <div class="flex flex-col items-center md:flex-row md:justify-around md:items-start">
    <Widget class="showcase-item" let:hover {...showcase.bybanestriden}>
      <Bybane {hover} />
    </Widget>

    <Widget class="showcase-item" let:hover {...showcase.schoolmodels}>
      <Schoolmodels {hover} />
    </Widget>
  </div>
</section>
