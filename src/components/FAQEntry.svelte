<script lang="ts">
  export let question: string;
  export let answer: string;
</script>

<li class="faq-list-item">
  <strong>{question}</strong>
  <br />
  {@html answer}
</li>
