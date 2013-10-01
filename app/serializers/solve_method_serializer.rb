class SolveMethodSerializer < ActiveModel::Serializer
  embed :ids
  attributes :id, :name
  has_one :puzzle
  has_many :steps
end
