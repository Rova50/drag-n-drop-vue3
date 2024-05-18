<template>
  <div class="row">
    <div class="col-3">
      <draggable
        class="list-group"
        :list="list1"
        group="people"
        @change="log"
        item-key="id"
        tag="div"
      >
        <template #item="{ element, index }">
          <Section 
            :sectionItem="element" 
            :containerIndex="1"
            @modify-item="modifyItem"
            @delete-item="deleteItem"
            @rename-item="renameItem"
          >
            <template v-slot:section-content>
              <component :is="element.component"></component>
            </template>
            
          </Section>
        </template>
      </draggable>
    </div>

    <div class="col-3">
      <draggable
        class="list-group"
        :list="list2"
        group="people"
        @change="log"
        item-key="id"
        tag="div"
      >
        <template #item="{ element, index }">
          <Section 
            :sectionItem="element" 
            :containerIndex="2"
            @modify-item="modifyItem"
            @delete-item="deleteItem"
            @rename-item="renameItem"
          >
            <template v-slot:section-content>
              <component :is="element.component"></component>
            </template>
          </Section>
        </template>
      </draggable>
    </div>
  </div>
</template>

<script>
import { ref, shallowRef } from 'vue';
import Section from './components/section.vue'
import BlankComponent from './components/blank-component.vue'

export default {
  name: "TwoLists",
  components: {
    Section,
    BlankComponent
  },
  setup() {
    const list1 = ref([
      { name: "car", id: 1, showMenu: false, component: BlankComponent },
      { name: "Motorbike", id: 2, showMenu: false, component: BlankComponent },
    ]);
    const list2 = ref([
      { name: "Home", id: 5, showMenu: false, component: BlankComponent },
      { name: "Hospital", id: 6, showMenu: false, component: BlankComponent },
      { name: "Workstation", id: 7, showMenu: false, component: BlankComponent }
    ]);

    const modifyItem = (item) => {
      alert(`Modifier l'item: ${item.name}`);
      toggleMenu(item.id)
    };

    const deleteItem = (list, item) => {
      const index = (list===1)
        ?list1.value.indexOf(item)
        :list2.value.indexOf(item);
      if (index !== -1) {
        (list===1)
        ?list1.value.splice(index, 1)
        :list2.value.splice(index, 1);
      }
    };

    const renameItem = (item) => {
      const newName = prompt('Nouveau nom:', item.name);
      if (newName) {
        item.name = newName;
      }
      toggleMenu(item.id)
    };

    const log = (evt) => {
      console.log(evt);
    };

    return {
      list1,
      list2,
      modifyItem,
      deleteItem,
      renameItem,
      log
    };
  }
};
</script>

<style scoped>
.row {
  display: flex;
  justify-content: space-around;
}

.col-3 {
  flex: 1;
  margin: 10px;
}

.list-group {
  border: 1px solid #ccc;
  border-radius: 4px;
  padding: 10px;
  min-height: 200px;
  min-width: 150px;
  background-color: #f9f9f9;
  transition: background-color 0.3s ease;
}

.list-group:hover {
  background-color: #e0e0e0;
}
</style>
