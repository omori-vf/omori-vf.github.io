<script>
  export let members;
  export let menuTitle;
  export let backText;

  let selectedMember = null;

  function selectMember(member) {
    selectedMember = member;
  }

  function back() {
    selectedMember = null;
  }
</script>

<section class="section-team">
  <div class="frame-outer">
    <div class="frame-content">
      {#if selectedMember != null}
        {selectedMember.backgroundUri}
        {selectedMember.pictureUri}
      {/if}
    </div>
  </div>

  <div class="frame-outer">
    <div class="frame-content">
      {#if selectedMember == null}
        <p>{menuTitle}</p>
      {:else}
        <p>{selectedMember.name}</p>
      {/if}
    </div>
  </div>

  <div class="frame-outer">
    <div class="frame-content">
      {#if selectedMember == null}
        <ul>
          {#each members as member}
            <li>
              <button on:click={() => selectMember(member)}>
                {member.name}
              </button>
            </li>
          {/each}
        </ul>
      {:else}
        <div class="about">
          <p>{@html selectedMember.about}</p>
          <button on:click={back}>
            {backText}
          </button>
        </div>
      {/if}
    </div>
  </div>
</section>

<style>
  .section-team {
    display: grid;
    grid-template: max-content auto / 1fr 1fr;
    min-height: 500px;
    gap: var(--spacing-xs);
  }

  .section-team > div:first-child {
    grid-row: 1 / 3;
  }

  .about {
    display: flex;
    flex-direction: column;
    height: 100%;
  }

  .about button {
    margin-top: auto;
    align-self: flex-start;
  }

  ul {
    margin: 0;
    padding: 0;
  }

  li {
    list-style: none;
  }

  button {
    background: inherit;
    color: inherit;
    border: none;
    font-family: inherit;
    font-size: var(--font-size-n);
  }

  button:hover {
    font-weight: bold;
  }
</style>