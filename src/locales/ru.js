export default {
  translation: {
    chat: {
      titles: {
        channels: 'Каналы',
      },
      messages: {
        counter: {
          key_one: '{{count}} сообщение',
          key_few: '{{count}} сообщения',
          key_many: '{{count}} сообщений',
        },
      },
    },
    buttons: {
      cancel: 'Отменить',
      send: 'Отправить',
      remove: 'Удалить',
      rename: 'Переименовать',
      login: 'Войти',
      logout: 'Выйти',
      signup: 'Зарегистрироваться',
    },
    modals: {
      titles: {
        addChannel: 'Добавить канал',
        removeChannel: 'Удалить канал',
        renameChannel: 'Переименовать канал',
        login: 'Войти',
        signup: 'Регистрация',
      },
      body: {
        removeChannel: 'Уверены?',
      },
      labels: {
        nickname: 'Ваш ник',
        password: 'Пароль',
        username: 'Имя пользователя',
        confirmPassword: 'Подтвердите пароль',
      },
    },
    text: {
      noAccount: 'Нет аккаунта?',
      enterMessage: 'Введите сообщение...',
    },
    errors: {
      mustBeUnique: 'Должно быть уникальным',
      invalidUsername: 'Неверные имя пользователя или пароль',
      existingUser: 'Такой пользователь уже существует',
      usernameLength: 'От 3 до 20 символов',
      passwordLength: 'Не менее 6 символов',
      passwordConfirmation: 'Пароли должны совпадать',
    },
  },
};
