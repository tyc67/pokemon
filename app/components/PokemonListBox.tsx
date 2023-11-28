'use client'

import { Fragment, useEffect, useState } from 'react'
import { Listbox, Transition } from '@headlessui/react'
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/react/20/solid'
import { useRouter } from 'next/navigation'

const sortOptions = [
  { name: 'Lowest Number (First)' },
  { name: 'Highest Number (First)' },
  { name: 'A-Z' },
  { name: 'Z-A' },
]

export default function PokemonListBox() {
  const router = useRouter()
  const [selected, setSelected] = useState(sortOptions[0])

  useEffect(() => {
    switch (selected.name) {
      case 'Lowest Number (First)':
        router.push('/pokedex?sort=num-asc')
        break
      case 'Highest Number (First)':
        router.push('/pokedex?sort=num-desc')
        break
      case 'A-Z':
        router.push('/pokedex?sort=a-z')
        break
      case 'Z-A':
        router.push('/pokedex?sort=z-a')
        break
    }
  }, [selected])

  return (
    <div className="w-72">
      <Listbox value={selected} onChange={setSelected}>
        <div className="relative mt-1">
          <Listbox.Button className="relative w-full cursor-default rounded-lg bg-gray-700 py-2 pl-3 pr-10 text-left shadow-md focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white/75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm">
            <span className="block truncate text-slate-100">{selected.name}</span>
            <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
              <ChevronUpDownIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
            </span>
          </Listbox.Button>
          <Transition
            as={Fragment}
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Listbox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-gray-500 px-1 py-1 text-base shadow-lg ring-1 ring-black/5 focus:outline-none sm:text-sm">
              {sortOptions.map((option, optionIdx) => (
                <Listbox.Option
                  key={optionIdx}
                  className={({ active }) =>
                    `relative cursor-default select-none rounded py-2 pl-10 pr-4 ${
                      active ? 'bg-slate-200 text-neutral-500' : 'text-gray-900'
                    }`
                  }
                  value={option}
                >
                  {({ selected }) => (
                    <>
                      <span
                        className={`block truncate ${selected ? 'font-medium' : 'font-normal'}`}
                      >
                        {option.name}
                      </span>
                      {selected ? (
                        <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-neutral-700">
                          <CheckIcon className="h-5 w-5" aria-hidden="true" />
                        </span>
                      ) : null}
                    </>
                  )}
                </Listbox.Option>
              ))}
            </Listbox.Options>
          </Transition>
        </div>
      </Listbox>
    </div>
  )
}
