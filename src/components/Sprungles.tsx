'use client';

import { useState } from 'react';
import { Bot, X, MessageSquare, Sparkles } from 'lucide-react';

export function Sprungles() {
  const [isOpen, setIsOpen] = useState(false);

  // NOTE: You can implement your API key / OpenRouter logic here.
  // The UI is built and ready for you to hook up your own backend fetch calls!

  return (
    <>
      {/* The Chat Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-6 right-6 p-4 bg-indigo-600 hover:bg-indigo-700 text-white rounded-full shadow-lg hover:shadow-xl transition-all transform hover:scale-105 z-50 group flex items-center justify-center"
          aria-label="Chat with Sprungles"
        >
          <Bot className="w-6 h-6" />
          <span className="absolute -top-10 right-0 bg-slate-900 text-white text-xs font-medium px-3 py-1.5 rounded shadow-sm opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
            Ask Sprungles!
          </span>
        </button>
      )}

      {/* The Chat Window */}
      {isOpen && (
        <div className="fixed bottom-6 right-6 w-80 sm:w-96 bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-800 z-50 flex flex-col overflow-hidden animate-in slide-in-from-bottom-5 fade-in duration-200">
          
          {/* Header */}
          <div className="bg-indigo-600 px-4 py-3 flex items-center justify-between">
            <div className="flex items-center gap-2 text-white">
              <Bot className="w-5 h-5" />
              <div>
                <h3 className="font-semibold text-sm">Sprungles</h3>
                <p className="text-[10px] text-indigo-200">Common Language Translator</p>
              </div>
            </div>
            <button 
              onClick={() => setIsOpen(false)}
              className="text-indigo-200 hover:text-white transition-colors p-1 rounded-full hover:bg-indigo-700"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Chat Body */}
          <div className="h-80 p-4 overflow-y-auto bg-slate-50 dark:bg-slate-950/50 flex flex-col gap-3">
            
            {/* Greeting */}
            <div className="flex items-start gap-2 max-w-[85%]">
              <div className="w-8 h-8 rounded-full bg-indigo-100 dark:bg-indigo-900 flex items-center justify-center flex-shrink-0">
                <Bot className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
              </div>
              <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 p-3 rounded-2xl rounded-tl-sm text-sm text-slate-700 dark:text-slate-300 shadow-sm">
                Hi! I'm Sprungles. I can help translate dense legal jargon and state bills into plain English. 
                <br/><br/>
                <em>(Ready for API integration!)</em>
              </div>
            </div>

            {/* User Message Placeholder (For demo) */}
             <div className="flex items-start gap-2 max-w-[85%] self-end flex-row-reverse">
              <div className="bg-indigo-600 text-white p-3 rounded-2xl rounded-tr-sm text-sm shadow-sm">
                What does SB-14 actually mean?
              </div>
            </div>

          </div>

          {/* Input Area */}
          <div className="p-3 bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800">
            <form className="flex items-center gap-2" onSubmit={(e) => e.preventDefault()}>
              <input
                type="text"
                placeholder="Ask about a bill..."
                className="flex-1 px-3 py-2 text-sm bg-slate-100 dark:bg-slate-800 border-none rounded-full focus:ring-2 focus:ring-indigo-500 focus:outline-none dark:text-white"
                disabled
              />
              <button 
                type="button"
                className="p-2 bg-indigo-600 text-white rounded-full hover:bg-indigo-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                disabled
              >
                <Sparkles className="w-4 h-4" />
              </button>
            </form>
          </div>

        </div>
      )}
    </>
  );
}
