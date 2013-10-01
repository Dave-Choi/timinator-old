class SolveSerializer < ActiveModel::Serializer
  embed :ids
  attributes :id, :scramble
  has_one :solve_method, :user
  has_many :step_results
end
