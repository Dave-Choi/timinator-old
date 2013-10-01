Timinator::Application.routes.draw do
  devise_for :users, controllers: { sessions: "sessions" }
  root :to => 'pages#home'

  resources :puzzles, :steps, :solves, :solve_methods, :step_results, only: [:index, :show, :create, :destroy, :update]
end
