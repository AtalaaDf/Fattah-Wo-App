import React from 'react'
import { Check, Plus, Trash2, X } from 'lucide-react'
import Button from '../../../../../components/ui/Button'

const FeatureList = ({ features, onToggleIncluded, onRemoveFeature }) => (
  <div className="space-y-2 max-h-36 overflow-y-auto pr-1">
    {features.map((feat, idx) => (
      <div key={idx} className="flex items-center justify-between gap-2 p-2 rounded-lg bg-slate-50 border border-slate-100 text-xs">
        <div className="flex items-center gap-2 flex-1">
          <button
            type="button"
            onClick={() => onToggleIncluded(idx)}
            className={`p-1 rounded ${feat.is_included ? 'bg-emerald-100 text-emerald-700' : 'bg-slate-200 text-slate-500'}`}
          >
            {feat.is_included ? <Check className="w-3.5 h-3.5" /> : <X className="w-3.5 h-3.5" />}
          </button>
          <span className={feat.is_included ? 'font-medium text-slate-800' : 'text-slate-400 line-through'}>
            {feat.label}
          </span>
        </div>
        <button
          type="button"
          onClick={() => onRemoveFeature(idx)}
          className="text-rose-500 hover:text-rose-700 p-1"
        >
          <Trash2 className="w-3.5 h-3.5" />
        </button>
      </div>
    ))}
  </div>
)

const FeatureInputRow = ({ newFeatureLabel, setNewFeatureLabel, newFeatureIncluded, setNewFeatureIncluded, onAddFeature }) => (
  <div className="flex items-center gap-2 pt-1">
    <input
      type="text"
      placeholder="Tambah fasilitas paket..."
      value={newFeatureLabel}
      onChange={(e) => setNewFeatureLabel(e.target.value)}
      className="flex-1 px-3 py-1.5 text-xs border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20"
      onKeyDown={(e) => {
        if (e.key === 'Enter') {
          e.preventDefault()
          onAddFeature()
        }
      }}
    />
    <button
      type="button"
      onClick={() => setNewFeatureIncluded(!newFeatureIncluded)}
      className={`px-2.5 py-1.5 text-xs font-semibold rounded-lg border flex items-center gap-1 ${
        newFeatureIncluded ? 'bg-emerald-50 text-emerald-700 border-emerald-200' : 'bg-slate-100 text-slate-500 border-slate-200'
      }`}
    >
      {newFeatureIncluded ? <Check className="w-3 h-3" /> : <X className="w-3 h-3" />}
      {newFeatureIncluded ? 'Termasuk' : 'Tidak'}
    </button>
    <Button
      type="button"
      size="sm"
      variant="outline"
      onClick={onAddFeature}
      leftIcon={<Plus className="w-3.5 h-3.5" />}
      className="flex-row whitespace-nowrap"
    >
      Tambah
    </Button>
  </div>
)

export const BundleFeaturesSection = ({
  features,
  onToggleIncluded,
  onRemoveFeature,
  newFeatureLabel,
  setNewFeatureLabel,
  newFeatureIncluded,
  setNewFeatureIncluded,
  onAddFeature,
}) => (
  <div className="pt-3 border-t border-slate-100 space-y-3">
    <label className="block text-xs font-bold uppercase tracking-wider text-slate-500">
      Daftar Fitur / Fasilitas Paket
    </label>
    <FeatureList
      features={features}
      onToggleIncluded={onToggleIncluded}
      onRemoveFeature={onRemoveFeature}
    />
    <FeatureInputRow
      newFeatureLabel={newFeatureLabel}
      setNewFeatureLabel={setNewFeatureLabel}
      newFeatureIncluded={newFeatureIncluded}
      setNewFeatureIncluded={setNewFeatureIncluded}
      onAddFeature={onAddFeature}
    />
  </div>
)

export default BundleFeaturesSection
