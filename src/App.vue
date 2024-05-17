<script>
  export default {
    data() {
      return {
        items: [
          {
            id: 0,
            title: 'Item A',
            list: 1,
            showMenu: false,
          },
          {
            id: 1,
            title: 'Item B',
            list: 1,
            showMenu: false,
          },
          {
            id: 2,
            title: 'Item C',
            list: 2,
            showMenu: false,
          },
        ],
      }
    },
    computed: {
      listOne() {
        return this.items.filter((item) => item.list === 1)
      },
      listTwo() {
        return this.items.filter((item) => item.list === 2)
      },
    },
    methods: {
      startDrag(evt, item) {
        evt.dataTransfer.dropEffect = 'move'
        evt.dataTransfer.effectAllowed = 'move'
        evt.dataTransfer.setData('itemID', item.id)
      },
      onDrop(evt, list) {
        const itemID = evt.dataTransfer.getData('itemID')
        const item = this.items.find((item) => item.id == itemID)
        item.list = list
      },
      toggleMenu(itemId) {
        this.items = this.items.map(item => {
          if (item.id === itemId) {
            item.showMenu = !item.showMenu;
          } else {
            item.showMenu = false;
          }
          return item;
        });
      },
      modifyItem(item) {
        alert(`Modifier l'item: ${item.title}`);
        // Ajouter la logique de modification
      },
      deleteItem(item) {
        this.items = this.items.filter(i => i.id !== item.id);
      },
      renameItem(item) {
        const newName = prompt('Nouveau nom:', item.title);
        if (newName) {
          item.title = newName;
        }
      },
      focusItem(itemId) {
        setTimeout(() => {
          this.closeMenu()
        }, 100);
      },
      closeMenu(itemId) {
        this.items = this.items.map((item) => {
          if (item.id === itemId) {
            item.showMenu = false;
          }
          return item;
        });
      },
      blurItem(itemId) {
        setTimeout(() => {
          this.closeMenu()
        }, 100);
      },
    },
  }
</script>

<template>
  <div>
    <div 
      class="drop-zone" 
      @drop="onDrop($event, 1)"
      @dragover.prevent
      @dragenter.prevent
    >
      <div 
        v-for="(item, index) in listOne" 
        :key="item.title" 
        :class="['drag-el', {'no-margin': index === listOne.length - 1}]"
        @focus="focusItem(item.id)"
        @blur="blurItem(item.id)"
      >
        <div 
          class="drag-handle"
          draggable="true"
          @dragstart="startDrag($event, item)"
        >
          ⇅
        </div>
        {{ item.title }}
        <div class="menu-container">
          <button @click="toggleMenu(item.id)" class="menu-button">⋮</button>
          <div v-if="item.showMenu" class="menu">
            <button @click="modifyItem(item)">Modifier</button>
            <button @click="deleteItem(item)">Supprimer</button>
            <button @click="renameItem(item)">Renommer</button>
          </div>
        </div>
      </div>
    </div>
    <div 
      class="drop-zone" 
      @drop="onDrop($event, 2)"
      @dragover.prevent
      @dragenter.prevent
    >
      <div 
        v-for="(item, index) in listTwo" 
        :key="item.title" 
        :class="['drag-el', {'no-margin': index === listTwo.length - 1}]"
        @focus="focusItem(item.id)"
        @blur="blurItem(item.id)"
      >
        <div 
          class="drag-handle"
          draggable="true"
          @dragstart="startDrag($event, item)"
        >
          ⇅
        </div>
        {{ item.title }}
        <div class="menu-container">
          <button @click="toggleMenu(item.id)" class="menu-button">⋮</button>
          <div v-if="item.showMenu" class="menu">
            <button @click="modifyItem(item)">Modifier</button>
            <button @click="deleteItem(item)">Supprimer</button>
            <button @click="renameItem(item)">Renommer</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
  .drop-zone {
    background-color: #f0f0f0; /* Couleur de fond améliorée */
    margin-bottom: 20px; /* Espacement amélioré */
    padding: 15px; /* Espacement amélioré */
    border: 2px dashed #bbb; /* Bordure améliorée */
    border-radius: 10px; /* Bords arrondis */
    transition: background-color 0.3s ease; /* Transition douce pour les survols */
  }
  
  .drop-zone:hover {
    background-color: #e0e0e0; /* Couleur de fond sur hover */
  }

  .drag-el {
    background-color: #ffffff; /* Couleur de fond des éléments */
    margin-bottom: 10px; /* Espacement des éléments */
    padding: 10px; /* Espacement interne des éléments */
    border: 1px solid #ccc; /* Bordure des éléments */
    border-radius: 5px; /* Bords arrondis des éléments */
    display: flex;
    align-items: center;
    justify-content: space-between;
    min-width: 150px; /* Largeur minimale des éléments */
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1); /* Ombre portée pour un effet de profondeur */
  }

  .drag-el.no-margin {
    margin-bottom: 0; /* Pas de marge inférieure pour le dernier élément */
  }

  .drag-handle {
    cursor: move; /* Curseur de déplacement */
    margin-right: 10px; /* Espacement à droite de l'indicateur */
    color: #888; /* Couleur de l'indicateur */
    font-size: 1.2em; /* Taille de l'indicateur */
  }

  .menu-container {
    position: relative;
  }

  .menu-button {
    background: none;
    border: none;
    cursor: pointer;
    font-size: 1.2em;
    padding: 5px;
  }

  .menu {
    position: absolute;
    right: 0;
    top: 20px;
    background: #fff;
    border: 1px solid #ccc;
    border-radius: 5px;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
    z-index: 1000;
    display: flex;
    flex-direction: column;
  }

  .menu button {
    background: none;
    border: none;
    padding: 10px;
    cursor: pointer;
    text-align: left;
  }

  .menu button:hover {
    background-color: #f0f0f0;
  }
</style>

