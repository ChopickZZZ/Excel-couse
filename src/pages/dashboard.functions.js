import { storage } from "../core/utils"

function toHTML(key) {
   const model = storage(key)

   const path = key.split(':').join('/')
   return `
   <li class="db__record">
      <a href="#${path}">${model.title}</a>
      <strong>${new Date(model.openDate).toLocaleString()}</strong>
   </li>
   `
}

function getAllKeys() {
   const keys = []
   for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i)
      if (!key.includes('excel')) {
         continue
      }
      else {
         keys.push(key)
      }
   }
   return keys
}

export function createRecordsTable() {
   const keys = getAllKeys()

   if (!keys.length) {
      return `<p>You have no excel tables</p>`
   }
   return `
      <div class="db__list-header">
         <span>Название</span>
         <span>Дата открытия</span>
      </div>
      <ul class="db__list">
         ${keys.map(toHTML).join('')}
      </ul>
   `
}