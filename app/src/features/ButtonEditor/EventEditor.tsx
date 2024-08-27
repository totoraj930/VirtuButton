import { usePluginEvent, usePluginFields } from '@/src/store';
import {
  getDefaultFieldValues,
  PluginFieldValues,
} from '@virtu-button/common/Plugin';
import { useEffect, useMemo, useState } from 'react';
import { PluginFieldsEditor } from '../PluginFieldEditor';

export type EventProps = {
  pluginId: string;
  eventId: string;
  initFieldValues: PluginFieldValues;
  onChange: (newValues: PluginFieldValues) => void;
};
export function EventEditor({
  pluginId,
  eventId,
  initFieldValues,
  onChange,
}: EventProps) {
  const pluginEvent = usePluginEvent(pluginId, eventId);
  const [eventValues, setEventValues] = useState(
    structuredClone(initFieldValues)
  );
  const [eventFields, errorText] = usePluginFields(
    pluginEvent?.fieldsId,
    eventValues
  );

  const eventValuesJson = useMemo(
    () => JSON.stringify(eventValues),
    [eventValues]
  );

  /**
   * 初期値と現在値を使ってeventValuesを更新
   */
  const updateValues = (
    def: typeof eventValues,
    values: typeof eventValues
  ) => {
    if (!eventFields) return;
    console.log('updateValues', values, def);
    let newValues = structuredClone(def);
    for (const key in def) {
      newValues[key] = values[key] ?? def[key];
    }
    setEventValues(newValues);
  };

  useEffect(() => {
    if (errorText) return;
    onChange(eventValues);
    console.log('values', eventValues);
  }, [eventValuesJson]);

  useEffect(() => {
    console.log(initFieldValues);
    if (!eventFields) {
      setEventValues(initFieldValues);
    } else {
      updateValues(getDefaultFieldValues(eventFields), initFieldValues);
    }
  }, [initFieldValues]);

  return (
    <div className="py-1 px-2">
      {eventFields && (
        <PluginFieldsEditor
          fields={eventFields}
          values={eventValues}
          onChange={(newValues) => {
            setEventValues(newValues);
          }}
        />
      )}
      {errorText && <p className="text-red-500">{errorText}</p>}
    </div>
  );
}
