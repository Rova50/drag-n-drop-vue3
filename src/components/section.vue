<template>
    <div 
        class="section" 
        @mouseenter="showOption"
        @mouseleave="hideOption"
        style="min-height: 100px;"
    >
        <div class="section-body">
            <div 
                v-if="isOption" 
                class="drag-handle"
            >⇅</div>
            <div class="drag-content">
                <div class="section-title">{{ element.name }}</div>
                <slot name="section-content"></slot>
            </div>
            <button 
                v-if="isOption"
                class="menu-button" 
                @focusout="closeMenu" 
                @click="toggleMenu(element.id)"
            >⋮</button>
        </div>
        <div v-if="element.showMenu" class="menu" @click.stop>
           <button @click="$emit('modify-item',element)">Modifier</button>
           <button @click="$emit('delete-item',containerIndex, element)">Supprimer</button>
           <button @click="$emit('rename-item',element)">Renommer</button>
        </div>
    </div>
</template>

<script setup>
import { ref, watchEffect } from 'vue';

const props = defineProps({
    sectionItem: Object,
    containerIndex: Number
});

const isOption = ref(false);

const element = ref({});
element.value = props.sectionItem;

watchEffect(()=>{
    element.value = props.sectionItem;
})

defineEmits(['modify-item','delete-item','rename-item']);

const toggleMenu = (id) => {
    element.value.showMenu = !element.value.showMenu;
};

const closeMenu = () => {
    setTimeout(() => {
        element.value.showMenu = false;
    }, 200);
}

const showOption = () => {
    isOption.value = true;
}

const hideOption = () => {
    isOption.value = false;
}
</script>

<style scoped>
.section {
  background-color: #fff;
  border: 1px solid #ddd;
  border-radius: 4px;
  padding: 10px;
  margin-bottom: 10px;
  position: relative;
  display: flex;
  flex-direction: column;
  min-width: 200px;
  transition: background-color 0.3s ease;
}

.section:hover {
  background-color: #f0f0f0;
}

.section-body {
  display: block;
}

.drag-handle {
  position: absolute;
  top:0;
  left: 0;
  cursor: move;
  color: #888;
  font-size: 1.2em;
  width: unset;
  height: unset;
  padding: 0 5px;
}

.menu-button {
  position: absolute;
  top:0;
  right:0;
  background: none;
  border: none;
  cursor: pointer;
  font-size: 1.2em;
  width: unset;
  height: unset;
  padding: 0 5px;
}

.menu {
  position: absolute;
  right: 10px;
  top: 30px;
  background: #fff;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  z-index: 1000;
  display: flex;
  flex-direction: column;
}

.menu button:hover {
  background-color: #f0f0f0;
}

.section-title {
    font-family: Roboto;
    font-size: 12px;
    color: #436975;
    text-transform: uppercase;
    text-align: center;
}
</style>