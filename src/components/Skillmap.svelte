<script>
import Text from '@/components/Text.svelte';
import SkillmapGalaxy from '@/components/SkillmapGalaxy.svelte';

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
