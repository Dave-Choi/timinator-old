class StepSerializer < ActiveModel::Serializer
  embed :ids
  attributes :id, :name, :description
  has_one :puzzle
end
