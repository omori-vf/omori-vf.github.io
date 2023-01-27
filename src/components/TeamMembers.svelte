<script lang="ts">
  import type { TeamMember } from "../models";

  export let members: TeamMember[];
  export let menuTitle: string;
  export let backText: string;

  let selectedMember: TeamMember | null = null;

  function selectMember(member: TeamMember) {
    selectedMember = member;
  }

  function back() {
    selectedMember = null;
  }
</script>

<section class="section-team">
  <div class="frame-outer">
    <div class="frame-content background-container">
      {#if selectedMember != null && !!selectedMember.pictureUri && !!selectedMember.backgroundUri}
        <img class="background" src={selectedMember.backgroundUri} alt="" />
        <div
          class="picture-container"
          style="align-items: {selectedMember.picturePlacement ?? 'flex-end'};"
        >
          <img
            class="picture"
            src={selectedMember.pictureUri}
            alt=""
            style="flex: 1 0 {selectedMember.pictureWidthPercent ?? 160}%;"
          />
        </div>
      {:else}
        <img class="team" src="/img/team.png" alt="" />
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
    grid-template: min-content 500px / minmax(0, 1fr) minmax(0, 1fr);
    gap: var(--spacing-xs);
    overflow: hidden;
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

  .background-container {
    display: grid;
    grid-template: 100% / 100%;
    overflow: hidden;
    padding: 0;
  }

  .team,
  .background {
    grid-row: 1 / 2;
    grid-column: 1 / 2;
    height: 100%;
  }

  .picture-container {
    display: flex;
    width: 100%;
    justify-content: center;
    grid-row: 1 / 2;
    grid-column: 1 / 2;
  }
</style>
