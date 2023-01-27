<script lang="ts">
    export let question: string;
    export let answer: string;
</script>

<li>
    <strong>{question}</strong>
    <br />
    {@html answer}
</li>