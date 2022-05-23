import { createApp } from 'vue';
import App from './App';
import { router } from './router';

import '@/assets/styles/_button.css';
import '@/assets/styles/_checkbox.css';
import '@/assets/styles/_form.css';
import '@/assets/styles/_input-group.css';
import '@/assets/styles/_page-auth.css';
import '@/assets/styles/_title.css';

createApp(App).use(router).mount('#app');
