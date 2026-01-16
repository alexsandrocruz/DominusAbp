using System;
using Sapienza.Dominus.EntityFrameworkCore;
using Volo.Abp.Domain.Repositories.EntityFrameworkCore;
using Volo.Abp.EntityFrameworkCore;

namespace Sapienza.Dominus.Tasks;

public class EfTaskRepository 
    : EfCoreRepository<DominusDbContext, Dominus.Tasks.Task, Guid>, 
      ITaskRepository
{
    public EfTaskRepository(IDbContextProvider<DominusDbContext> dbContextProvider) 
        : base(dbContextProvider)
    {
    }
}
