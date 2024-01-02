<script>
import Text from '$lib/components/Text.svelte';
import SkillmapGalaxy from '$lib/components/SkillmapGalaxy.svelte';

export let title;
export let body;
export let skills;
export let connections;
</script>


<section>
  <Text>
    <h2>{title}</h2>
    {body}

    <SkillmapGalaxy
      nodes={skills}
      edges={connections}
    />
  </Text>
</section>
