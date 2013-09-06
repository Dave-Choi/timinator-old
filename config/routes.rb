Timinator::Application.routes.draw do
  devise_for :users, controllers: { sessions: "sessions" }
  root :to => 'pages#home'
end
