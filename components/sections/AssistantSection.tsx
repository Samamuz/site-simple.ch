
import React, { useState, useRef, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import { sendMessageToGemini, resetChat } from '../../services/geminiService';
import { Message } from '../../types';

export const AssistantSection: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'welcome',
      role: 'model',
      content: `Bonjour ! Je suis l'assistant de **site-simple.ch**. \n\nJe suis là pour répondre à vos questions sur nos offres de création de sites web ou sur notre agence. Comment puis-je vous aider ?`,
      timestamp: new Date()
    }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const chatContainerRef = useRef<HTMLDivElement>(null);
  const isFirstRender = useRef(true);

  // Gestion intelligente du scroll
  useEffect(() => {
    if (!chatContainerRef.current) return;

    // Éviter le scroll au chargement initial de la page
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }

    const lastMsg = messages[messages.length - 1];

    if (isLoading) {
      chatContainerRef.current.scrollTo({
        top: chatContainerRef.current.scrollHeight,
        behavior: 'smooth'
      });
      return;
    }

    if (!lastMsg) return;

    const timeoutId = setTimeout(() => {
      if (!chatContainerRef.current) return;

      if (lastMsg.role === 'user') {
        chatContainerRef.current.scrollTo({
          top: chatContainerRef.current.scrollHeight,
          behavior: 'smooth'
        });
      } else {
        const msgElement = document.getElementById(`sect-msg-${lastMsg.id}`);
        // On ne scrollIntoView que si l'élément est dans le conteneur, 
        // et on utilise un calcul manuel pour éviter de scroller la fenêtre principale par erreur.
        if (msgElement) {
           const container = chatContainerRef.current;
           const msgTop = msgElement.offsetTop;
           const msgHeight = msgElement.offsetHeight;
           const containerHeight = container.clientHeight;
           
           // Si le message est plus bas que la vue actuelle dans le conteneur, on scroll le conteneur
           if (msgTop + msgHeight > container.scrollTop + containerHeight) {
             container.scrollTo({
               top: msgTop - containerHeight + msgHeight + 20, // 20px padding
               behavior: 'smooth'
             });
           }
        }
      }
    }, 100);

    return () => clearTimeout(timeoutId);
  }, [messages, isLoading]);

  const handleSend = async (text: string = input) => {
    if (!text.trim() || isLoading) return;

    const userMsg: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: text,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsLoading(true);

    try {
      const responseText = await sendMessageToGemini(text);
      const botMsg: Message = {
        id: (Date.now() + 1).toString(),
        role: 'model',
        content: responseText,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, botMsg]);
    } catch (error) {
      const errorMsg: Message = {
        id: (Date.now() + 1).toString(),
        role: 'model',
        content: "Une erreur est survenue. Veuillez réessayer.",
        timestamp: new Date()
      };
      setMessages(prev => [...prev, errorMsg]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleClear = () => {
    resetChat();
    setMessages([{
      id: Date.now().toString(),
      role: 'model',
      content: "Conversation réinitialisée.",
      timestamp: new Date()
    }]);
  };

  const suggestions = [
    "Quels sont vos tarifs ?",
    "Combien de temps pour un site ?",
    "Proposez-vous du e-commerce ?"
  ];

  return (
    <section className="py-24 px-6 bg-white border-t border-neutral-100">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12 space-y-4">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-black">ASSISTANT IA</h2>
          <p className="text-lg text-neutral-500 font-light max-w-2xl mx-auto">
            Une question sur nos services ? Obtenez une réponse immédiate.
          </p>
        </div>

        {/* Chat Interface Container */}
        <div id="assistant" className="w-full h-[600px] flex flex-col bg-neutral-50 border border-neutral-200 shadow-[0_4px_30px_rgba(0,0,0,0.04)] rounded-[4px] overflow-hidden relative">
          
          {/* Chat Header */}
          <div className="bg-white/90 backdrop-blur z-10 py-3 px-6 border-b border-neutral-200 flex justify-between items-center shrink-0">
             <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
                <span className="text-xs font-semibold uppercase tracking-widest text-neutral-500">En ligne</span>
             </div>
             <button onClick={handleClear} className="text-xs text-neutral-400 hover:text-black transition-colors uppercase tracking-wider">Réinitialiser</button>
          </div>

          {/* Messages Zone */}
          <div 
            ref={chatContainerRef}
            className="flex-1 overflow-y-auto px-4 md:px-8 py-6 space-y-6 scrollbar-hide"
          >
            {messages.map((msg) => (
              <div 
                key={msg.id}
                id={`sect-msg-${msg.id}`}
                className={`flex flex-col ${msg.role === 'user' ? 'items-end' : 'items-start'}`}
              >
                <div 
                  className={`max-w-[90%] md:max-w-[85%] px-5 py-3 text-sm leading-relaxed rounded-[2px] ${
                    msg.role === 'user' 
                      ? 'bg-black text-white shadow-md' 
                      : 'bg-white text-neutral-800 border border-neutral-200 shadow-sm'
                  }`}
                >
                   <div className={`prose prose-sm max-w-none ${msg.role === 'user' ? 'prose-invert' : 'prose-neutral'}`}>
                    <ReactMarkdown 
                      components={{
                        p: ({node, ...props}) => <p className="mb-2 last:mb-0 font-light" {...props} />,
                        ul: ({node, ...props}) => <ul className="list-disc pl-5 my-2 space-y-1" {...props} />,
                        li: ({node, ...props}) => <li className="font-light" {...props} />,
                        strong: ({node, ...props}) => <strong className={`font-semibold ${msg.role === 'user' ? 'text-white' : 'text-black'}`} {...props} />,
                      }}
                    >
                      {msg.content}
                    </ReactMarkdown>
                   </div>
                </div>
                <span className="text-[10px] text-neutral-400 mt-2 px-1 uppercase tracking-wider">
                  {msg.role === 'user' ? 'Vous' : 'Assistant'}
                </span>
              </div>
            ))}
            
            {isLoading && (
              <div className="flex flex-col items-start pl-1">
                 <div className="bg-neutral-200/50 px-4 py-3 rounded-[2px] flex space-x-1">
                   <div className="w-1.5 h-1.5 bg-neutral-400 rounded-full animate-pulse"></div>
                   <div className="w-1.5 h-1.5 bg-neutral-400 rounded-full animate-pulse delay-100"></div>
                   <div className="w-1.5 h-1.5 bg-neutral-400 rounded-full animate-pulse delay-200"></div>
                 </div>
              </div>
            )}
          </div>

          {/* Input Area */}
          <div className="p-4 bg-white border-t border-neutral-200 shrink-0">
            {messages.length < 3 && !isLoading && (
              <div className="flex flex-wrap gap-2 justify-center mb-4">
                {suggestions.map((sugg, i) => (
                  <button
                    key={i}
                    onClick={() => handleSend(sugg)}
                    className="px-3 py-1.5 bg-neutral-50 border border-neutral-200 text-xs text-neutral-600 hover:border-black hover:text-black transition-all duration-200"
                  >
                    {sugg}
                  </button>
                ))}
              </div>
            )}

            <form 
              onSubmit={(e) => { e.preventDefault(); handleSend(); }}
              className="relative"
            >
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Posez votre question..."
                disabled={isLoading}
                className="w-full bg-neutral-50 border border-neutral-200 py-3 pl-4 pr-12 text-sm text-black placeholder-neutral-400 focus:bg-white focus:border-black transition-all outline-none rounded-[2px]"
              />
              <button 
                type="submit" 
                disabled={isLoading || !input.trim()}
                className="absolute right-2 top-1/2 -translate-y-1/2 p-2 text-neutral-400 hover:text-black disabled:opacity-30 transition-colors"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><line x1="22" y1="2" x2="11" y2="13"></line><polygon points="22 2 15 22 11 13 2 9 22 2"></polygon></svg>
              </button>
            </form>
          </div>

        </div>
      </div>
    </section>
  );
};
