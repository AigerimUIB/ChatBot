<template>
  <div class="chat-container">
    <div class="chat-messages">
      <div v-for="(message, index) in messages" :key="index" :class="message.role">
        <span>{{ message.content }}</span>
      </div>
    </div>
    <form @submit.prevent="sendMessage" class="chat-input">
      <input 
        v-model="userInput" 
        placeholder="Введите сообщение..." 
        type="text" 
        class="chat-input-field"
      />
      <button type="submit" class="chat-submit-btn">Отправить</button>
    </form>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      userInput: '',
      messages: [
        { role: 'assistant', content: 'Привет! Чем я могу вам помочь?' }
      ],
    };
  },
  methods: {
    async sendMessage() {
      if (!this.userInput.trim()) return;

      const userMessage = { role: 'user', content: this.userInput };
      this.messages.push(userMessage);

      try {
        const response = await axios.post('http://localhost:3000/chat', {
          messages: this.messages,
        });

        const botReply = response.data.reply;
        this.messages.push({ role: 'assistant', content: botReply });
      } catch (error) {
        this.messages.push({
          role: 'assistant',
          content: 'Произошла ошибка. Попробуйте позже.',
        });
      } finally {
        this.userInput = '';
      }
    },
  },
};
</script>

<style>
/* Общие стили для контейнера */
.chat-container {
  display: flex;
  flex-direction: column;
  height: 80vh; /* Высота чата */
  max-width: 600px; /* Максимальная ширина */
  margin: 0 auto;
  background-color: #f9f9f9;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  padding: 20px;
}

/* Стили для сообщений */
.chat-messages {
  flex: 1;
  overflow-y: auto;
  margin-bottom: 20px;
  padding-right: 10px;
  padding-left: 10px;
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.chat-messages .user {
  align-self: flex-end;
  background-color: #065f20;
  color: white;
  border-radius: 12px;
  padding: 8px 15px;
  max-width: 70%;
  word-wrap: break-word;
}

.chat-messages .assistant {
  align-self: flex-start;
  background-color: #e0e0e0;
  color: #333;
  border-radius: 12px;
  padding: 8px 15px;
  max-width: 70%;
  word-wrap: break-word;
}

/* Стиль для формы ввода */
.chat-input {
  display: flex;
  gap: 10px;
}

.chat-input-field {
  flex-grow: 1;
  padding: 10px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 8px;
  outline: none;
}

.chat-submit-btn {
  padding: 10px 15px;
  background-color: #065f20;
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.chat-submit-btn:hover {
  background-color: #055e1f;
}

.chat-submit-btn:active {
  background-color: #064b1a;
}

.chat-messages span {
  display: inline-block;
  word-wrap: break-word;
}

/* Медиа-запросы для мобильных устройств */
@media (max-width: 768px) {
  .chat-container {
    max-width: 100%; /* Чат займет всю ширину экрана */
    height: 90vh; /* Сделаем высоту чата чуть больше на мобильных устройствах */
    padding: 10px;
  }

  .chat-messages {
    margin-bottom: 15px;
  }

  .chat-input-field {
    font-size: 14px; /* Уменьшаем размер текста на мобильных устройствах */
  }

  .chat-submit-btn {
    font-size: 14px; /* Уменьшаем кнопку */
    padding: 8px 12px;
  }
}

@media (max-width: 480px) {
  .chat-container {
    padding: 5px;
  }

  .chat-messages .user,
  .chat-messages .assistant {
    max-width: 90%; /* Сообщения будут занимать больше пространства */
  }

  .chat-input-field {
    font-size: 14px;
    padding: 8px;
  }

  .chat-submit-btn {
    font-size: 13px;
    padding: 8px 10px;
  }
}
</style>
