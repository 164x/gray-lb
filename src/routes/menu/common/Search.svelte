<script lang="ts">
    import {createEventDispatcher} from "svelte";

    let value = "";

    const dispatch = createEventDispatcher<{
        search: { query: string }
    }>();
</script>

<input class="search" type="text" placeholder="Search..." bind:value={value}
       on:input={() => dispatch("search", {query: value})}>

<style lang="scss">
  @import "../../../colors.scss";

  .search {
    background-color: rgba($menu-base-color, .36);
    border: none;
    color: $menu-text-color;
    font-family: "Inter", sans-serif;
    font-size: 20px;
    border-radius: 12px;
    border-bottom: solid 4px $accent-color;
    background-image: url("/img/menu/icon-search.svg");
    background-repeat: no-repeat;
    background-position: 20px center;
    padding: 20px 20px 20px 60px;
    flex: 1;
     
  }
</style>